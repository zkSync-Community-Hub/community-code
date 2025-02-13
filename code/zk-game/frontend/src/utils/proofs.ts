// ANCHOR: submit-proof
import { HTTP_API_URL, WS_API_URL } from './constants';
import type { Action } from './types';

export async function submitProof(actionLog: Action[], blocksDestroyed: number, timeElapsed: number) {
  try {
    if (!blocksDestroyed || !timeElapsed || actionLog.length === 0) {
      alert('Invalid proof data');
      return;
    }

    const jobID = await requestProof(actionLog, blocksDestroyed, timeElapsed);
    if (!jobID) {
      return;
    }
    const result = await getProofResult(jobID);
    return result.proof_data;
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
    const response = await fetch(`${HTTP_API_URL}/prove`, {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProofResult(jobID: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const wsEndpoint = `${WS_API_URL}/proof/${jobID}`;
    const socket = new WebSocket(wsEndpoint);

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 'failed') {
        reject(new Error('Proof generation failed'));
      } else if (data.status === 'complete') {
        socket.close();
        resolve(data);
      }
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      socket.close();
      reject(error);
    });

    setTimeout(() => {
      socket.close();
      reject(new Error('WebSocket connection timed out'));
    }, 5 * 60000); // 5 min timeout
  });
}
// ANCHOR_END: proof-helpers
