import { useState } from 'react';
import type { Address, BaseError } from 'viem';
import { useReadContract } from 'wagmi';
import * as erc20TokenABI from '../../../frontend-paymaster/contracts/artifacts-zk/contracts/erc20/MyERC20Token.sol/MyERC20Token.json';

const CONTRACT_ADDRESS = '0x9c1a3d7C98dBF89c7f5d167F2219C29c2fe775A7';

export function ReadContract() {
  return (
    <div>
      <div>
        <BalanceOf />
        <br />
        <TotalSupply />
      </div>
    </div>
  );
}

function TotalSupply() {
  const { data, isRefetching, refetch } = useReadContract({
    abi: erc20TokenABI.abi,
    address: CONTRACT_ADDRESS,
    functionName: 'totalSupply',
  });

  console.log('data', data);

  return (
    <div>
      Total Supply: {data?.toString()}
      <button
        disabled={isRefetching}
        onClick={() => refetch()}
        style={{ marginLeft: 4 }}
      >
        {isRefetching ? 'loading...' : 'refetch'}
      </button>
    </div>
  );
}

function BalanceOf() {
  const [address, setAddress] = useState<Address>('0xBC989fDe9e54cAd2aB4392Af6dF60f04873A033A');
  const { data, error, isLoading, isSuccess } = useReadContract({
    abi: erc20TokenABI.abi,
    address: CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [address],
  });

  const [value, setValue] = useState<string>(address);

  return (
    <div>
      Token balance: {isSuccess && data?.toString()}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        style={{ marginLeft: 4 }}
        value={value}
      />
      <button onClick={() => setAddress(value as Address)}>{isLoading ? 'fetching...' : 'fetch'}</button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
