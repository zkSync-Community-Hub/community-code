import { Provider, utils, Contract, Wallet, getGwBlockForBatch } from 'zksync-ethers';
import { ethers } from 'ethers';
import { rewardsChain } from '../config/wagmi';
import { GATEWAY_RPC, GW_CHAIN_ID, interopClient } from '../config/constants';

const leaderboardProvider = new Provider(rewardsChain.rpcUrls.default.http[0]);

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

// for local testing only
// forces interop root to update on local leaderboard chain by sending txns
// for testnet or mainnet, use `waitForGatewayInteropRoot` method from `zksync-ethers`
export async function updateLocalChainInteropRoot(
  txHash: string,
  srcProvider: Provider,
  timeoutMs = 120_000
): Promise<string> {
  const PRIVATE_KEY = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110';
  const wallet = new Wallet(PRIVATE_KEY, leaderboardProvider);
  const receipt = await (await srcProvider.getTransaction(txHash)).waitFinalize();
  const gw = new ethers.JsonRpcProvider(GATEWAY_RPC);
  const gwBlock = await getGwBlockForBatch(BigInt(receipt.l1BatchNumber!), srcProvider, gw);

  // fetch the interop root from target chain
  const InteropRootStorage = new Contract(
    utils.L2_INTEROP_ROOT_STORAGE_ADDRESS,
    utils.L2_INTEROP_ROOT_STORAGE_ABI,
    wallet
  );

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const root: string = await InteropRootStorage.interopRoots(GW_CHAIN_ID, gwBlock);
    if (root && root !== '0x' + '0'.repeat(64)) return root;
    // send tx just to get chain2 to seal batch
    const t = await wallet.sendTransaction({
      to: wallet.address,
      value: BigInt(1),
    });
    await (await wallet.provider.getTransaction(t.hash)).waitFinalize();
  }
  throw new Error(`Chain2 did not import interop root for (${GW_CHAIN_ID}, ${gwBlock}) in time`);
}

export async function getProveScoreArgs(txHash: string, srcProvider: Provider) {
  const args = await interopClient.getVerificationArgs({
    txHash: txHash as `0x${string}`,
    srcProvider: srcProvider, // source chain provider (to fetch proof + batch details)
    targetChain: leaderboardProvider, // target chain provider (to read interop root + verify)
  });
  return args;
}
