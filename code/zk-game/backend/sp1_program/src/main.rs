// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.
#![no_main]
sp1_zkvm::entrypoint!(main);

use alloy_sol_types::SolType;
use game_lib::{Action, GameState, PublicValuesStruct};

pub fn main() {
    let action_log = sp1_zkvm::io::read::<Vec<Action>>();
    let claimed_blocks_destroyed = sp1_zkvm::io::read::<u32>();
    let claimed_time_elapsed = sp1_zkvm::io::read::<f32>();

    let result =
        GameState::verify_replay(action_log, claimed_time_elapsed, claimed_blocks_destroyed);

    let bytes = PublicValuesStruct::abi_encode(&PublicValuesStruct {
        blocksDestroyed: claimed_blocks_destroyed,
        timeElapsed: (claimed_time_elapsed * 1000.) as u32,
        isValid: result,
    });

    sp1_zkvm::io::commit_slice(&bytes);
}
