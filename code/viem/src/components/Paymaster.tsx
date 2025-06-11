import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
// ANCHOR: setup-imports
import { createWalletClient, custom, type Account } from 'viem';
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
  const [userAccount, setUserAccount] = useState<`0x${string}` | Account | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window: any = globalThis.window;

  // ANCHOR: client
  // Initialize and extend the wallet client
  const client = createWalletClient({
    chain: zksyncSepoliaTestnet,
    transport: custom(window.ethereum!),
  }).extend(eip712WalletActions());
  // ANCHOR_END: client

  useEffect(() => {
    async function requestAccount() {
      // Request account access from the Ethereum provider
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(account);
    }
    requestAccount();
  }, [window]);

  async function writeToContract() {
    if (!userAccount) {
      console.error('User account is not set. Please connect your wallet.');
      return;
    }

    // ANCHOR: use-paymaster
    // Replace with your paymaster address
    const paymasterAddress = '0xdeAD0bD94D5975538B7678C0EaAd28d20FbFF8A7';

    // Call the contract function
    const hash = await client.writeContract({
      account: userAccount,
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
  }

  return (
    <>
      <button onClick={writeToContract}>Write with Paymaster</button>
    </>
  );
};

export default Paymaster;
