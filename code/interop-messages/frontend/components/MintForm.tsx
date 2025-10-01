import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { getChainInfo, getContractAddress } from '../config/wagmi';
import { TOKEN_CONTRACT_ADDRESS } from '../config/constants';
import type { Abi } from 'viem';
import { Provider } from 'zksync-ethers';
import { checkIfTxIsFinalized, getProveScoreArgs, updateLocalChainInteropRoot } from '../utils/prove';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOKEN_JSON = { abi: [] as any };

export default function MintForm() {
  const [chainId, setChainId] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>('');
  const [isSubmitPending, setIsSubmitPending] = useState<boolean>(false);
  const [isFinalized, setIsFinalized] = useState<boolean>(false);
  const [isRootUpdated, setIsRootUpdated] = useState<boolean>(false);
  const { writeContract } = useWriteContract();

  const filler = () => {
    if (isSubmitPending && isFinalized && isRootUpdated) {
      setChainId(1);
      setTxHash('');
    }
  };

  // ANCHOR: submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash || !chainId) {
      alert('missing tx hash');
      return;
    }
    const chain = getChainInfo(chainId);
    const stakingContractAddress = getContractAddress(chainId);
    if (!chain || !stakingContractAddress) {
      alert('Staking chain not supported');
      return;
    }
    setIsSubmitPending(true);
    const provider = new Provider(chain.rpcUrls.default.http[0]);
    const status = await checkIfTxIsFinalized(txHash, provider);
    if (status !== 'EXECUTED') {
      alert('Deposit txn is not yet finalized.');
      setIsSubmitPending(false);
      return;
    }
    setIsFinalized(true);
    await updateLocalChainInteropRoot(txHash, provider);
    setIsRootUpdated(true);
    const args = await getProveScoreArgs(txHash, provider);

    writeContract({
      address: TOKEN_CONTRACT_ADDRESS,
      abi: TOKEN_JSON.abi as Abi,
      functionName: 'mint',
      args: [args.srcChainId, args.l1BatchNumber, args.l2MessageIndex, args.msgData, args.gatewayProof],
    });
  };
  // ANCHOR_END: submit

  return (
    <>
      <button onClick={handleSubmit}>submit</button>
      <button onClick={filler}>filler</button>
    </>
  );
}
