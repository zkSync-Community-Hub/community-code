// ANCHOR: submit-proof
import { API_URL } from './constants';
import type { Action } from './types';

export async function submitProof(actionLog: Action[], blocksDestroyed: number, timeElapsed: number) {
  try {
    if (!blocksDestroyed || !timeElapsed || actionLog.length === 0) {
      console.log('Invalid proof data');
      return;
    }

    const jobID = await requestProof(actionLog, blocksDestroyed, timeElapsed);
    if (!jobID) {
      return;
    }
    const proofData = await getProofResult(jobID);
    return proofData;
  } catch (error) {
    console.error('Error creating proof:', error);
  }
}
// ANCHOR_END: submit-proof

// ANCHOR: proof-helpers
async function requestProof(actionLog: Action[], blocksDestroyed: number, timeElapsed: number) {
  try {
    const inputData = JSON.stringify({
      action_log: actionLog,
      blocks_destroyed: blocksDestroyed,
      time_elapsed: timeElapsed,
    });
    const response = await fetch(`${API_URL}/prove/async`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputData,
    });
    const { job_id: jobID } = await response.json();
    return jobID;
  } catch (error) {
    console.error('Error requesting proof:', error);
  }
}

async function checkProof(jobID: string) {
  try {
    const response = await fetch(`${API_URL}/prove/status/${jobID}`);
    const { status, proof_data: proofData } = await response.json();
    return { status, proofData };
  } catch (error) {
    console.error('Error checking proof:', error);
    alert('Error requesting proof. Please try again.');
    return null;
  }
}

function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, seconds);
  });
}

async function getProofResult(jobID: string) {
  const totalAttempts = 20;
  let attempts = 0;
  // wait 50 seconds
  await wait(1000 * 50);
  while (attempts < totalAttempts) {
    const response = await checkProof(jobID);
    if (!response) {
      return;
    }
    const { status, proofData } = response;
    if (status === 'failed') {
      alert('Proof failed. Please try again.');
      attempts = totalAttempts;
      return;
    }
    if (status === 'complete') {
      attempts = totalAttempts;
      return proofData;
    }
    // wait 10 seconds
    await wait(1000 * 10);
    attempts++;
  }
}
// ANCHOR_END: proof-helpers
