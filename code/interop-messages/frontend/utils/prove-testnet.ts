import { Provider, utils, getGwBlockForBatch, waitForGatewayInteropRoot } from 'zksync-ethers';
import { ethers } from 'ethers';
import { rewardsChain } from '../config/wagmi';
import { GATEWAY_RPC, GW_CHAIN_ID, interopClient } from '../config/constants';

const rewardsProvider = new Provider(rewardsChain.rpcUrls.default.http[0]);

export async function checkIfTxIsFinalized(txHash: string, provider: Provider, timeoutMs = 220_000) {
  let status:
    | 'QUEUED'
    | 'SENDING'
    | 'PROVING'
    | 'EXECUTED'
    | 'FAILED'
    | 'REJECTED'
    | 'UNKNOWN'
    | {
        phase: string;
        message: 'No details available';
      } = 'QUEUED';
  const deadline = Date.now() + timeoutMs;
  let firstCheck = false;
  while (status !== 'EXECUTED' && Date.now() < deadline) {
    status = await interopClient.getMessageStatus(provider, txHash as `0x${string}`);
    if (!firstCheck) {
      firstCheck = true;
    } else {
      await utils.sleep(20000);
    }
  }
  return status;
}

export async function waitForChainInteropRoot(txHash: string, srcProvider: Provider) {
  const receipt = await (await srcProvider.getTransaction(txHash)).waitFinalize();
  const gw = new ethers.JsonRpcProvider(GATEWAY_RPC);
  const gwBlock = await getGwBlockForBatch(BigInt(receipt.l1BatchNumber!), srcProvider, gw);

  const root = await waitForGatewayInteropRoot(GW_CHAIN_ID, rewardsProvider, gwBlock);
  if (!root) {
    throw new Error(`Rewards chain did not import interop root for (${GW_CHAIN_ID}, ${gwBlock}) in time`);
  }
}

export async function getProveScoreArgs(txHash: string, srcProvider: Provider) {
  const args = await interopClient.getVerificationArgs({
    txHash: txHash as `0x${string}`,
    srcProvider: srcProvider, // source chain provider (to fetch proof + batch details)
    targetChain: rewardsProvider, // target chain provider (to read interop root + verify)
  });
  return args;
}
