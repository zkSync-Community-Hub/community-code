import { parseEther } from 'viem';
import { useSendTransaction } from 'wagmi';

export function SendTx() {
  const { sendTransaction, isError, isPending, isSuccess, data, error } = useSendTransaction();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const address = formData.get('address') as `0x${string}`;
          const value = formData.get('value') as `${number}`;
          sendTransaction({
            to: address,
            value: parseEther(value),
          });
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

      {isPending && <div>Transaction pending...</div>}
      {isSuccess && <div>Transaction Hash: {data}</div>}
      {isError && <div>Error: {error?.message}</div>}
    </>
  );
}
