import { DEFAULT_GAS_PER_PUBDATA_LIMIT, getPaymasterParams } from 'zksync-ethers/build/utils';
import { type Wallet, type Provider, type types, SmartAccount } from 'zksync-ethers';
import { ethers } from 'ethers';
import accountAbiJSON from '../../contracts/artifacts-zk/contracts/Account.sol/Account.json';

export async function getTransaction(to: string, from: string, value: string, data: string, provider: Provider) {
  const gasPrice = await provider.getGasPrice();
  const chainId = (await provider.getNetwork()).chainId;
  const nonce = await provider.getTransactionCount(from);
  const overrides = await getPaymasterOverrides();
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
    customData: overrides.customData as types.Eip712Meta,
  };
}

export async function getPaymasterOverrides() {
  const PAYMASTER_ADDRESS = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || '';
  const paymasterParams = getPaymasterParams(PAYMASTER_ADDRESS, {
    type: 'General',
    innerInput: new Uint8Array(),
  });
  return {
    customData: {
      gasPerPubdata: DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

export async function registerKeyInAccount(pubKey: string, account: string, provider: Provider, wallet: Wallet) {
  try {
    const contract = new ethers.Contract(account, accountAbiJSON.abi, provider);
    const data = contract.interface.encodeFunctionData('updateR1Owner', [pubKey]);
    const transferAmount = '0';
    const registerTx = await getTransaction(account, account, transferAmount, data, provider);
    const smartAccount = new SmartAccount({ address: account, secret: wallet.privateKey }, provider);
    await smartAccount.sendTransaction(registerTx);
  } catch (error) {
    console.error('Error:', error);
  }
}
