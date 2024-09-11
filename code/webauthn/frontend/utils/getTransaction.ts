import type { Provider } from 'zksync-ethers';
import { ethers } from 'ethers';
import { DEFAULT_GAS_PER_PUBDATA_LIMIT } from 'zksync-ethers/build/utils';

export async function getTransaction(to: string, from: string, value: string, data: string, provider: Provider) {
  const gasPrice = await provider.getGasPrice();
  const nonce = await provider.getTransactionCount(from);
  const chainId = 260;
  return {
    to,
    from,
    value: ethers.utils.parseEther(value),
    data,
    gasPrice,
    gasLimit: BigInt(2000000000),
    chainId,
    nonce,
    type: 113,
    customData: {
      gasPerPubdata: DEFAULT_GAS_PER_PUBDATA_LIMIT,
    },
  };
}
