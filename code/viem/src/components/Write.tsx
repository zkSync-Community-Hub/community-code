// ANCHOR: write
import { createWalletClient, custom, encodeFunctionData, type Account } from 'viem';
import {
  // zksync,
  zksyncSepoliaTestnet,
  // zksyncInMemoryNode,
  // zksyncLocalNode
} from 'viem/chains';
import greeterAbi from '../utils/Greeter.json';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { client as publicClient } from './Read';

const Write = ({ update }: { update: Dispatch<SetStateAction<number>> }) => {
  const [userAccount, setUserAccount] = useState<`0x${string}` | Account | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window: any = globalThis.window;

  useEffect(() => {
    async function requestAccount() {
      // Request account access from the Ethereum provider
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(account);
    }
    requestAccount();
  }, [window]);

  // Configure the wallet client
  const client = createWalletClient({
    account: userAccount,
    chain: zksyncSepoliaTestnet,
    transport: custom(window.ethereum),
  });

  async function writeToContract() {
    if (!userAccount) {
      console.error('User account is not set. Please connect your wallet.');
      return;
    }
    const data = encodeFunctionData({
      abi: greeterAbi,
      functionName: 'sendMessage',
      args: ['ZK is the endgame!'],
    });

    // Example transaction
    const hash = await client.sendTransaction({
      account: userAccount,
      to: '0xe2e810a56672336C0Cc303E5f8156A5a56DBE150',
      data,
      chain: client.chain,
    });

    await publicClient.waitForTransactionReceipt({ hash });
    update((prev) => prev + 1);
  }
  // ANCHOR_END: write

  return (
    <>
      <button onClick={writeToContract}>Write To Greeter Contract</button>
    </>
  );
};

export default Write;
