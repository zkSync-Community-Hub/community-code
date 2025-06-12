import { type Dispatch, type SetStateAction } from 'react';
// ANCHOR: setup-imports
import { createWalletClient, custom } from 'viem';
import {
  // zksync,
  zksyncSepoliaTestnet,
  // zksyncInMemoryNode,
  // zksyncLocalNode
} from 'viem/chains';
import { eip712WalletActions, getGeneralPaymasterInput } from 'viem/zksync';
// ANCHOR_END: setup-imports
import greeterAbi from '../utils/Greeter.json';
import { publicClient } from '../utils/client';

const Paymaster = ({ update }: { update: Dispatch<SetStateAction<number>> }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window: any = globalThis.window;

  async function writeToContract() {
    try {
      // ANCHOR: client
      // Initialize and extend the wallet client
      const client = createWalletClient({
        chain: zksyncSepoliaTestnet,
        transport: custom(window.ethereum!),
      }).extend(eip712WalletActions());
      // ANCHOR_END: client

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!account) {
        console.error('User account is not set. Please connect your wallet.');
        return;
      }

      // ANCHOR: use-paymaster
      // Replace with your paymaster address
      const paymasterAddress = '0xdeAD0bD94D5975538B7678C0EaAd28d20FbFF8A7';

      // Call the contract function
      const hash = await client.writeContract({
        account,
        address: '0xe2e810a56672336C0Cc303E5f8156A5a56DBE150',
        abi: greeterAbi,
        functionName: 'sendMessage',
        args: ['ZKsync Paymaster'],
        paymaster: paymasterAddress,
        paymasterInput: getGeneralPaymasterInput({ innerInput: new Uint8Array() }),
      });

      await publicClient.waitForTransactionReceipt({ hash });
      // ANCHOR_END: use-paymaster
      update((prev) => prev + 1);
    } catch (error) {
      console.error('Error writing to contract:', error);
    }
  }

  return (
    <>
      <button onClick={writeToContract}>Write with Paymaster</button>
    </>
  );
};

export default Paymaster;
