import { sendTx } from '@/utils/sendTx';
import { useState } from 'react';

export function SendTxTS() {
  const [data, setData] = useState<string>();
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const address = formData.get('address') as `0x${string}`;
          const value = formData.get('value') as `${number}`;
          const txData = await sendTx(address, value);
          setData(txData);
        }}
      >
        <input
          name="address"
          placeholder="address"
        />
        <input
          name="value"
          placeholder="value (ether)"
        />
        <button type="submit">Send</button>
      </form>

      {data && <div>Transaction Hash: {data}</div>}
    </>
  );
}
