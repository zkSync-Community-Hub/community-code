import { fetchLatestBlockNumber } from '@/utils/block';
import { useState } from 'react';

export function BlockTS() {
  const [block, setBlock] = useState<bigint>();

  const updateBlock = async () => {
    const newBlock = await fetchLatestBlockNumber();
    setBlock(newBlock);
  };

  return (
    <div>
      <button onClick={updateBlock}>Update Block</button>
      {block && <p>Block: {block.toString()}</p>}
    </div>
  );
}
