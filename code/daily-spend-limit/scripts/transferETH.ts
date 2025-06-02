import { ethers, network } from 'hardhat';
import { EIP712Signer, Provider, types, utils } from 'zksync-ethers';

const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY =
  process.env.DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY || '<DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY>';
const ACCOUNT_ADDRESS = process.env.DEPLOYED_ACCOUNT_ADDRESS || '<ACCOUNT_ADDRESS>';
const RECEIVER_ACCOUNT = process.env.RECEIVER_ACCOUNT || '';

async function main() {
  const [signer] = await ethers.getSigners();
  const provider = signer.provider;
  const owner = new ethers.Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY, provider);

  // ⚠️ update this amount to test if the limit works; 0.00051 fails but 0.00049 succeeds
  const transferAmount = '0.00051';

  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice;

  const ethTransferTx = {
    from: ACCOUNT_ADDRESS,
    to: RECEIVER_ACCOUNT, // account that will receive the ETH transfer
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(ACCOUNT_ADDRESS),
    type: 113,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,

    value: ethers.parseEther(transferAmount),
    gasPrice,
    gasLimit: BigInt(20000000), // constant 20M since estimateGas() causes an error and this tx consumes more than 15M at most
    data: '0x',
  };
  const signedTxHash = EIP712Signer.getSignedDigest(ethTransferTx);
  const signature = ethers.concat([ethers.Signature.from(owner.signingKey.sign(signedTxHash)).serialized]);

  ethTransferTx.customData = {
    ...ethTransferTx.customData,
    customSignature: signature,
  };

  const account = await ethers.getContractAt('Account', ACCOUNT_ADDRESS, owner);
  const limitData = await account.limits(utils.L2_BASE_TOKEN_ADDRESS);
  console.log('Account ETH limit is: ', limitData.limit.toString());
  console.log('Available today: ', limitData.available.toString());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = network.config as any;

  // L1 timestamp tends to be undefined in latest blocks. So it should find the latest L1 Batch first.
  if (config.url !== 'http://127.0.0.1:8011') {
    const l1Provider = new Provider(config.ethNetwork);
    const l1BatchRange = await l1Provider.getL1BatchBlockRange(await l1Provider.getL1BatchNumber());
    const l1TimeStamp = (await l1Provider.getBlock(l1BatchRange![1])).l1BatchTimestamp;

    console.log('L1 timestamp: ', l1TimeStamp);
    console.log('Limit will reset on timestamp: ', limitData.resetTime.toString());
  }

  // actually do the ETH transfer
  console.log('Sending ETH transfer from smart contract account');
  const sentTx = await provider.broadcastTransaction(types.Transaction.from(ethTransferTx).serialized);
  await sentTx.wait();
  console.log(`ETH transfer tx hash is ${sentTx.hash}`);

  console.log('Transfer completed and limits updated!');

  const newLimitData = await account.limits(utils.L2_BASE_TOKEN_ADDRESS);
  console.log('Account limit: ', newLimitData.limit.toString());
  console.log('Available today: ', newLimitData.available.toString());
  console.log('Limit will reset on timestamp:', newLimitData.resetTime.toString());

  if (newLimitData.resetTime.toString() == limitData.resetTime.toString()) {
    console.log('Reset time was not updated as not enough time has passed');
  } else {
    console.log('Limit timestamp was reset');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
