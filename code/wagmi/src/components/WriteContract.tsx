import { useState } from 'react';
import { type BaseError, useWriteContract } from 'wagmi';
import * as greeterABI from '../../../frontend-paymaster/contracts/artifacts-zk/contracts/Greeter.sol/Greeter.json';

const CONTRACT_ADDRESS = '0xCeAB1fc2693930bbad33024D270598c620D7A52B';

export function WriteContract() {
  const [greeting, setGreeting] = useState<string>();
  const { writeContract, isError, isPending, isSuccess, data, error } = useWriteContract();

  async function updateGreeting() {
    if (!greeting) return;
    writeContract({
      abi: greeterABI.abi,
      address: CONTRACT_ADDRESS,
      functionName: 'setGreeting',
      args: [greeting],
    });
  }

  return (
    <div>
      <input
        onChange={(e) => setGreeting(e.target.value)}
        placeholder="Hello, Zeek!"
        style={{ marginLeft: 4 }}
        value={greeting}
      />
      <button onClick={updateGreeting}>{isPending ? '...Pending' : 'Update Greeting'}</button>
      {isError && <div>{(error as BaseError).shortMessage}</div>}
      {isSuccess && <div>Transaction hash: {data}</div>}
    </div>
  );
}
