#[macro_use]
extern crate rocket;

use alloy_sol_types::SolType;
use game_lib::{Action, PublicValuesStruct};
use rocket::{
    fairing::{Fairing, Info, Kind},
    http::{Header, Method, Status},
    serde::{json::*, Deserialize, Serialize},
    tokio,
    tokio::sync::RwLock,
    Request, Response, State,
};
use sp1_sdk::{ProverClient, SP1Stdin};
use std::{collections::HashMap, sync::Arc};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "rocket::serde")]
struct ProofResponse {
    public_values: String,
    proof: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "rocket::serde")]
struct ProofInput {
    action_log: Vec<Action>,
    blocks_destroyed: u32,
    time_elapsed: f32,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "rocket::serde")]
struct JobResponse {
    job_id: String,
    status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    proof_data: Option<ProofResponse>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "rocket::serde")]
enum JobState {
    Processing,
    Complete(ProofResponse),
    Failed(String),
    NotFound,
}

type JobStorage = Arc<RwLock<HashMap<String, JobState>>>;

/// The ELF file for the Succinct RISC-V zkVM.
pub const ELF: &[u8] = include_bytes!("../../elf/riscv32im-succinct-zkvm-elf");

#[post("/prove/async", data = "<input>")]
async fn prove_async(input: Json<ProofInput>, jobs: &State<JobStorage>) -> Json<JobResponse> {
    let job_id = Uuid::new_v4().to_string();
    let job_id_for_task = job_id.clone();

    {
        let mut jobs_lock = jobs.write().await;
        jobs_lock.insert(job_id.clone(), JobState::Processing);
    }

    // Clone necessary data for the async task
    let proof_input = input.0.clone();
    let jobs_clone = Arc::clone(jobs);

    // Spawn async task
    tokio::spawn(async move {
        match generate_proof(proof_input).await {
            Ok(proof_response) => {
                // Update job storage with the proof data
                let mut jobs_lock = jobs_clone.write().await;
                jobs_lock.insert(job_id_for_task, JobState::Complete(proof_response));
            }
            Err(e) => {
                // Update job storage with the error
                let mut jobs_lock = jobs_clone.write().await;
                jobs_lock.insert(job_id_for_task, JobState::Failed(e.to_string()));
            }
        }
    });

    Json(JobResponse {
        job_id,
        status: "processing".to_string(),
        proof_data: None,
    })
}

#[get("/prove/status/<job_id>")]
async fn check_status(job_id: String, jobs: &State<JobStorage>) -> Json<JobResponse> {
    let job_state = jobs
        .inner()
        .try_read()
        .unwrap()
        .get(&job_id)
        .cloned()
        .unwrap_or(JobState::NotFound);

    match job_state {
        JobState::Processing => Json(JobResponse {
            job_id,
            status: "processing".to_string(),
            proof_data: None,
        }),
        JobState::Complete(proof_data) => Json(JobResponse {
            job_id,
            status: "complete".to_string(),
            proof_data: Some(proof_data),
        }),
        JobState::Failed(_error) => Json(JobResponse {
            job_id,
            status: "failed".to_string(),
            proof_data: None,
        }),
        JobState::NotFound => Json(JobResponse {
            job_id,
            status: "not_found".to_string(),
            proof_data: None,
        }),
    }
}
async fn generate_proof(
    input: ProofInput,
) -> Result<ProofResponse, Box<dyn std::error::Error + Send>> {
    // Setup the prover client.
    let client = ProverClient::from_env();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();

    stdin.write(&input.action_log);
    stdin.write(&input.blocks_destroyed);
    stdin.write(&input.time_elapsed);

    let (output, _report) = client.execute(ELF, &stdin).run()?;

    // Read the output.
    let decoded = PublicValuesStruct::abi_decode(output.as_slice(), true).unwrap();
    let PublicValuesStruct {
        blocksDestroyed: _blocks_destroyed,
        timeElapsed: _time_elapsed,
        isValid: is_valid,
    } = decoded;
    let (pk, _vk) = client.setup(ELF);

    match is_valid {
        true => {
            println!("generating proof...");
            let proof = client.prove(&pk, &stdin).groth16().run()?;
            println!("successfully generated proof!");

            let public_values = proof.public_values.as_slice();
            let final_public_values = hex::encode(public_values);
            println!("public values: 0x{}", final_public_values);

            let solidity_proof = proof.bytes();
            let final_solidity_proof = hex::encode(solidity_proof);
            println!("proof: 0x{}", final_solidity_proof);

            Ok(ProofResponse {
                public_values: final_public_values,
                proof: final_solidity_proof,
            })
        }
        false => {
            let error_message = "Invalid proof";
            let return_error: Box<dyn std::error::Error + Send> = Box::new(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                error_message,
            ));
            Err(return_error)
        }
    }
}

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, request: &'r Request<'_>, response: &mut Response<'r>) {
        if request.method() == Method::Options {
            response.set_status(Status::NoContent);
            response.set_header(Header::new(
                "Access-Control-Allow-Methods",
                "POST, PATCH, GET, DELETE",
            ));
            response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        }

        response.set_header(Header::new(
            "Access-Control-Allow-Origin",
            "http://localhost:5173",
        ));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[rocket::main]
async fn main() {
    let state: JobStorage = Arc::new(RwLock::new(HashMap::new()));

    rocket::build()
        .attach(CORS)
        .manage(state)
        .mount("/", routes![prove_async, check_status])
        .launch()
        .await
        .unwrap();
}
