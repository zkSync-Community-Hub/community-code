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
    gasLimit: BigInt(20000000), // constant 20M since estimateGas() causes an error and this tx consumes more than 15M at most
    chainId,
    nonce,
    type: 113,
    customData: {
      gasPerPubdata: DEFAULT_GAS_PER_PUBDATA_LIMIT,
    },
  };
}
