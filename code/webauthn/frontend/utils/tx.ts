import { DEFAULT_GAS_PER_PUBDATA_LIMIT, getPaymasterParams } from 'zksync-ethers/build/utils';
import { EIP712Signer, type Wallet, type Provider, utils, type types } from 'zksync-ethers';
import { ethers } from 'ethers';
import * as accountAbiJSON from '../../contracts/artifacts-zk/contracts/Account.sol/Account.json';
import { PAYMASTER_ADDRESS } from '@/pages/index';

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
    const overrides = await getPaymasterOverrides();

    const registerTx = {
      to: account,
      from: account,
      chainId: (await provider.getNetwork()).chainId,
      nonce: await provider.getTransactionCount(account),
      type: 113,
      customData: overrides.customData,
      value: ethers.utils.parseEther(transferAmount),
      gasPrice: await provider.getGasPrice(),
      gasLimit: BigInt(2000000000),
      data,
    };
    const signedTxHash = EIP712Signer.getSignedDigest(registerTx);
    const signingKey: ethers.utils.SigningKey = new ethers.utils.SigningKey(wallet.privateKey);
    const walletSignature = signingKey.signDigest(signedTxHash);
    const sig = ethers.utils.joinSignature(walletSignature);
    const signature = ethers.utils.concat([sig]);

    registerTx.customData = {
      ...registerTx.customData,
      customSignature: signature,
    };

    const finalTx = utils.serialize(registerTx);
    const sentTx = await provider.sendTransaction(finalTx);
    await sentTx.wait();
  } catch (error) {
    console.error('Error:', error);
  }
}
