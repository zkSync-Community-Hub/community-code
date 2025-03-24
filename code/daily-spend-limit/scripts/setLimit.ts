import { ethers } from 'hardhat';
import { EIP712Signer, types, utils } from 'zksync-ethers';
import { L2_BASE_TOKEN_ADDRESS } from 'zksync-ethers/build/utils';

const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY =
  process.env.DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY || '<DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY>';
const ACCOUNT_ADDRESS = process.env.DEPLOYED_ACCOUNT_ADDRESS || '<DEPLOYED_ACCOUNT_ADDRESS>';

async function main() {
  const owner = new ethers.Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY, ethers.providerL2, ethers.providerL1);
  const account = await ethers.getContractAt('Account', ACCOUNT_ADDRESS, owner);

  let setLimitTx = await account.setSpendingLimit.populateTransaction(
    L2_BASE_TOKEN_ADDRESS,
    ethers.parseEther('0.0005')
  );

  const provider = ethers.providerL2;

  setLimitTx = {
    ...setLimitTx,
    from: ACCOUNT_ADDRESS,
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(ACCOUNT_ADDRESS),
    type: 113,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: BigInt(0),
  };

  setLimitTx.gasPrice = await provider.getGasPrice();
  setLimitTx.gasLimit = await provider.estimateGas(setLimitTx);

  const signedTxHash = EIP712Signer.getSignedDigest(setLimitTx);

  const signature = ethers.concat([ethers.Signature.from(owner.signingKey.sign(signedTxHash)).serialized]);

  setLimitTx.customData = {
    ...setLimitTx.customData,
    customSignature: signature,
  };

  console.log('Setting limit for account...');
  const sentTx = await provider.broadcastTransaction(types.Transaction.from(setLimitTx).serialized);

  await sentTx.wait();

  const limit = await account.limits(L2_BASE_TOKEN_ADDRESS);
  console.log('Account limit enabled?: ', limit.isEnabled);
  console.log('Account limit: ', limit.limit.toString());
  console.log('Available limit today: ', limit.available.toString());
  console.log('Time to reset limit: ', limit.resetTime.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
