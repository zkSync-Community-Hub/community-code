import { prepareTx } from '../utils/prepareTx';
import { useState } from 'react';
import { config } from '../../wagmi-config';
import { sendTransaction } from '@wagmi/core';

export function SendTxPreparedTS() {
  const [data, setData] = useState<string>();
  const [to, setTo] = useState<`0x${string}`>();
  const [value, setValue] = useState<string>('0.0');

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!to) return;
          const tx = await prepareTx(to, value as `${number}`);
          const txData = await sendTransaction(config, tx);
          setData(txData);
        }}
      >
        <input
          placeholder="address"
          onChange={(e) => setTo(e.target.value as `0x${string}`)}
          value={to}
        />
        <input
          id="value"
          placeholder="value (ether)"
          onChange={(e) => setValue(e.target.value)}
          value={value?.toString()}
        />
        <button
          disabled={!value || !to}
          type="submit"
        >
          Send
        </button>
      </form>

      {data && <div>Transaction Hash: {data}</div>}
    </>
  );
}
