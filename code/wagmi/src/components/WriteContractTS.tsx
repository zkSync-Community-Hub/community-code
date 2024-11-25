import { useState } from 'react';
import { writeToGreeterContract } from '../utils/write';

export function WriteContractTS() {
  const [greeting, setGreeting] = useState<string>();
  const [data, setData] = useState<string>();

  async function updateGreeting() {
    if (!greeting) return;
    const txData = await writeToGreeterContract(greeting);
    setData(txData as string);
  }

  return (
    <div>
      <input
        onChange={(e) => setGreeting(e.target.value)}
        placeholder="Hello, Zeek!"
        style={{ marginLeft: 4 }}
        value={greeting}
      />
      <button onClick={updateGreeting}>Update Greeting</button>
      {data && <div>Transaction hash: {data}</div>}
    </div>
  );
}
