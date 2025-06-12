import { useEffect, useState } from 'react';
import greeterAbi from '../utils/Greeter.json';
// ANCHOR: client
import { createPublicClient, http, type Chain, type PublicClient } from 'viem';
import {
  // zksync,
  zksyncSepoliaTestnet,
  // zksyncInMemoryNode,
  // zksyncLocalNode
} from 'viem/chains';

// Initialize the Viem client
const client: PublicClient = createPublicClient({
  chain: zksyncSepoliaTestnet as Chain, // Specify the ZKsync network
  transport: http(), // Define the transport method
});
// ANCHOR_END: client

const Read = ({ update }: { update: number }) => {
  const [blockNum, setBlockNum] = useState<bigint>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      // ANCHOR: block-number
      const blockNumber = await client.getBlockNumber();
      console.log(`Current block number: ${blockNumber}`);
      // ANCHOR_END: block-number
      setBlockNum(blockNumber);

      // ANCHOR: read-contract
      const messageResponse = await client.readContract({
        address: '0xe2e810a56672336C0Cc303E5f8156A5a56DBE150',
        abi: greeterAbi,
        functionName: 'getLastMessage',
      });
      // ANCHOR_END: read-contract
      if (typeof messageResponse === 'string') {
        setMessage(messageResponse);
      }
    }
    fetchData();
  }, [update]);

  return (
    <>
      {blockNum && (
        <div>
          <h2>Current Block Number</h2>
          <p>{blockNum}</p>
        </div>
      )}
      {message && (
        <div>
          <h2>Current Message 1:</h2>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Read;
