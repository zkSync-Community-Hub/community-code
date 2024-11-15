import { useState } from 'react';
import { parseEther } from 'viem';
import { usePrepareTransactionRequest, useSendTransaction } from 'wagmi';

export function SendTxPrepared() {
  const [to, setTo] = useState<`0x${string}`>();
  const [value, setValue] = useState<string>('0.0');

  const { data: txRequest } = usePrepareTransactionRequest({
    to,
    value: parseEther(value as `${number}`),
  });

  const { sendTransaction, isError, isPending, isSuccess, data, error } = useSendTransaction();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!txRequest) return;
          sendTransaction(txRequest);
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
          disabled={!txRequest}
          type="submit"
        >
          Send
        </button>
      </form>

      {isPending && <div>Transaction pending...</div>}
      {isSuccess && <div>Transaction Hash: {data}</div>}
      {isError && <div>Error: {error?.message}</div>}
    </>
  );
}
