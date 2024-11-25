import { useBalance } from 'wagmi';

export function Balance() {
  const balance = useBalance({
    address: '0xBC989fDe9e54cAd2aB4392Af6dF60f04873A033A',
  });

  return <div>{balance && <p>Balance: {balance.data?.value.toString()}</p>}</div>;
}
