// ANCHOR: wagmi-imports
import {
  http,
  createConfig,
  connect,
  getAccount,
  writeContract,
  waitForTransactionReceipt,
  disconnect,
  readContract,
} from '@wagmi/core';
import { zksyncInMemoryNode } from '@wagmi/core/chains';
import { type Abi, parseEther } from 'viem';
import { zksyncSsoConnector, callPolicy } from 'zksync-sso/connector';
import { ABI, GAME_CONTRACT_ADDRESS, PAYMASTER_CONTRACT_ADDRESS } from './constants';
import { getGeneralPaymasterInput } from 'viem/zksync';
import type { Score } from './types';
// ANCHOR_END: wagmi-imports

// ANCHOR: sso-connector
const ssoConnector = zksyncSsoConnector({
  authServerUrl: 'http://localhost:3002/confirm',
  session: {
    expiry: '1 hour',
    feeLimit: parseEther('0.1'),
    contractCalls: [
      callPolicy({
        address: GAME_CONTRACT_ADDRESS,
        abi: ABI as Abi,
        functionName: 'verifyProof',
      }),
    ],
  },
});
// ANCHOR_END: sso-connector

// ANCHOR: wagmi-config
export const config = createConfig({
  chains: [
    // zksyncSepoliaTestnet,
    zksyncInMemoryNode,
  ],
  connectors: [ssoConnector],
  transports: {
    // [zksyncSepoliaTestnet.id]: http(),
    [zksyncInMemoryNode.id]: http(),
  },
});
// ANCHOR_END: wagmi-config

// ANCHOR: connect-fn
export const connectWithSSO = () => {
  connect(config, {
    connector: ssoConnector,
    chainId: config.chains[0].id,
  });
};
// ANCHOR_END: connect-fn

// ANCHOR: disconnect
export const disconnectWallet = async () => {
  await disconnect(config);
};
// ANCHOR_END: disconnect

// ANCHOR: high-scores
export async function getPlayerHighScore(playerAddress: `0x${string}`) {
  const data = await readContract(config, {
    abi: ABI,
    address: GAME_CONTRACT_ADDRESS,
    functionName: 'getPlayerScore',
    args: [playerAddress],
  });
  return data;
}

export async function getHighScores() {
  const highScores: Score[] = [];
  const data = await readContract(config, {
    abi: ABI,
    address: GAME_CONTRACT_ADDRESS,
    functionName: 'getTopScores',
  });

  if (Array.isArray(data)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedData: Score[] = data as any;

    typedData.forEach((score) => {
      const newHighScore: Score = {
        player: score.player,
        blocksDestroyed: score.blocksDestroyed,
        timeElapsed: score.timeElapsed,
      };
      highScores.push(newHighScore);
    });
  }

  if (highScores.length < 10) {
    for (let i = highScores.length; i < 10; i++) {
      highScores.push({
        player: '0x0000000000000000000000000000000000000000',
        blocksDestroyed: 0n,
        timeElapsed: 0n,
      });
    }
  }

  return highScores;
}
// ANCHOR_END: high-scores

// ANCHOR: verify-proof
export async function verifyProof(publicValues: string, proofBytes: string) {
  if (!publicValues || !proofBytes) {
    alert('Proof data not found');
    return;
  }

  const account = getAccount(config);
  if (!account.address) {
    alert('Account not found');
    return;
  }

  const txHash = await writeContract(config, {
    abi: ABI,
    address: GAME_CONTRACT_ADDRESS,
    functionName: 'verifyProof',
    args: [publicValues, proofBytes],
    paymaster: PAYMASTER_CONTRACT_ADDRESS,
    paymasterInput: getGeneralPaymasterInput({ innerInput: '0x' }),
    chainId: config.chains[0].id,
    connector: config.connectors[0],
  });

  const transactionReceipt = await waitForTransactionReceipt(config, {
    hash: txHash,
  });
  return transactionReceipt.status === 'success';
}
// ANCHOR_END: verify-proof
