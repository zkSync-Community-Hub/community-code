// ANCHOR: imports
import { getContract } from 'viem';
import greeterAbi from '../utils/Greeter.json'; // Your contract's ABI
import { useEffect, useState } from 'react';
import { publicClient } from '../utils/client'; // Your initialized Viem client
// ANCHOR_END: imports

const ReadContract = ({ update }: { update: number }) => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    async function getLastMessage() {
      // ANCHOR: read-message
      // Initialize the contract instance
      const contract = getContract({
        address: '0xe2e810a56672336C0Cc303E5f8156A5a56DBE150',
        abi: greeterAbi,
        client: publicClient,
      });

      // Interact with your contract
      const result = await contract.read.getLastMessage();
      console.log(`Last Message: ${result}`);
      // ANCHOR_END: read-message
      if (typeof result === 'string') {
        setMessage(result);
      }
    }
    getLastMessage();
  }, [update]);

  return (
    <>
      {message && (
        <div>
          <h2>Current Message 2:</h2>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default ReadContract;
