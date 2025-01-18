use alloy_sol_types::SolType;
use game_lib::*;
use sp1_sdk::{HashableKey, ProverClient, SP1Stdin};

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const ELF: &[u8] = include_bytes!("../../elf/riscv32im-succinct-zkvm-elf");

fn main() {
    // Setup the logger.
    sp1_sdk::utils::setup_logger();

    // Setup the prover client.
    let client = ProverClient::from_env();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();

    let test_actions: Vec<Action> = vec![
        Action {
            direction: Controls::None,
            count: 26,
        },
        Action {
            direction: Controls::Right,
            count: 28,
        },
        Action {
            direction: Controls::None,
            count: 124,
        },
        Action {
            direction: Controls::Right,
            count: 13,
        },
        Action {
            direction: Controls::None,
            count: 95,
        },
        Action {
            direction: Controls::Left,
            count: 29,
        },
        Action {
            direction: Controls::None,
            count: 51,
        },
        Action {
            direction: Controls::Left,
            count: 28,
        },
        Action {
            direction: Controls::None,
            count: 227,
        },
    ];

    let actual_final_score: u32 = 6;
    let actual_time_elapsed: f32 = 10.35;

    stdin.write(&test_actions);
    stdin.write(&actual_final_score);
    stdin.write(&actual_time_elapsed);

    println!("Executing program...");
    let (output, _report) = client.execute(ELF, &stdin).run().unwrap();
    println!("Program executed successfully.");
    let decoded = PublicValuesStruct::abi_decode(output.as_slice(), true).unwrap();

    println!("blocks_destroyed: {:?}", decoded.blocksDestroyed);
    println!("time_elapsed: {:?}", decoded.timeElapsed);
    println!("is_valid: {:?}", decoded.isValid);
    assert!(decoded.isValid);

    let (pk, vk) = client.setup(ELF);
    let vk_bytes = vk.bytes32();
    println!("V KEY: {:?}", vk_bytes);

    // GENERATE THE PROOF
    println!("generating proof...");
    let proof = client.prove(&pk, &stdin).groth16().run().unwrap();
    println!("successfully generated proof for the program!");

    let public_values = proof.public_values.as_slice();
    let final_public_values = hex::encode(public_values);
    println!("public values: 0x{}", final_public_values);

    let solidity_proof = proof.bytes();
    let final_solidity_proof = hex::encode(solidity_proof);
    println!("proof: 0x{}", final_solidity_proof);
}

