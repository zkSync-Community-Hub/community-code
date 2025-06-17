// ANCHOR: write
import { createWalletClient, custom, encodeFunctionData } from 'viem';
import {
  // zksync,
  zksyncSepoliaTestnet,
  // zksyncInMemoryNode,
  // zksyncLocalNode
} from 'viem/chains';
import greeterAbi from '../utils/Greeter.json';
import type { Dispatch, SetStateAction } from 'react';
import { publicClient } from '../utils/client';

const Write = ({ update }: { update: Dispatch<SetStateAction<number>> }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window: any = globalThis.window;

  async function writeToContract() {
    try {
      // Request account access from the Ethereum provider
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!account) return;
      // Configure the wallet client
      const client = createWalletClient({
        account,
        chain: zksyncSepoliaTestnet,
        transport: custom(window.ethereum),
      });

      const data = encodeFunctionData({
        abi: greeterAbi,
        functionName: 'sendMessage',
        args: ['ZK is the endgame!'],
      });

      // Example transaction
      const hash = await client.sendTransaction({
        account,
        to: '0xe2e810a56672336C0Cc303E5f8156A5a56DBE150',
        data,
        chain: client.chain,
      });

      await publicClient.waitForTransactionReceipt({ hash });
      update((prev) => prev + 1);
    } catch (error) {
      console.error('Error writing to contract:', error);
    }
  }
  // ANCHOR_END: write

  return (
    <>
      <button onClick={writeToContract}>Write To Greeter Contract</button>
    </>
  );
};

export default Write;
