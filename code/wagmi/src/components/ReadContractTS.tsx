import { readERC20Contract } from '@/utils/read';
import { useState } from 'react';

export function ReadContractTS() {
  const [data, setData] = useState<string>();

  async function updateTotalSupply() {
    const supply = await readERC20Contract('totalSupply');
    const newData = supply as bigint;
    setData(newData.toString());
  }

  return (
    <div>
      {data && <div>Total Supply: {data?.toString()}</div>}
      <button
        onClick={updateTotalSupply}
        style={{ marginLeft: 4 }}
      >
        Update Total Supply
      </button>
    </div>
  );
}
