import { useBlockNumber } from 'wagmi';

export function Block() {
  const block = useBlockNumber();

  return <div>{block && <p>Block: {block.data?.toString()}</p>}</div>;
}
