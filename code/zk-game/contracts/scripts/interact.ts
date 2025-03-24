import { deployer, network, ethers } from 'hardhat';
import { DEFAULT_GAS_PER_PUBDATA_LIMIT, getPaymasterParams } from 'zksync-ethers/build/utils';
import { Provider, SmartAccount, type types, Wallet } from 'zksync-ethers';

// Address of the contract to interact with
const GAME_CONTRACT_ADDRESS = process.env.GAME_CONTRACT_ADDRESS ?? '0x...';
const PAYMASTER_CONTRACT_ADDRESS = process.env.PAYMASTER_CONTRACT_ADDRESS ?? '0x...';

const exampleProofs: { publicValues: string; proofBytes: string }[] = [
  {
    publicValues: '0x...',
    proofBytes: '0x...',
  },
];

// An example of a script to interact with the contract
async function main() {
  console.log(`Running script to interact with contract ${GAME_CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await deployer.loadArtifact('Brickles');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = network.config;
  const provider = new Provider(config.url);
  const [deployerWallet] = await ethers.getWallets();

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(GAME_CONTRACT_ADDRESS, contractArtifact.abi, deployerWallet);

  // submit scores
  for await (const proofData of exampleProofs) {
    console.log('SUBMITTING SCORE....');
    await newSubmission(provider, proofData.publicValues, proofData.proofBytes, contractArtifact.abi);
  }

  // get all the high scores
  const topScores = await contract.getTopScores();
  console.log('Top scores: ', topScores);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function newSubmission(provider: Provider, publicValues: string, proofBytes: string, abi: any[]) {
  const newWallet = Wallet.createRandom().connect(provider);
  await sendTx(newWallet.address, newWallet.privateKey, abi, provider, [publicValues, proofBytes]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendTx(address: string, pk: string, abi: any, provider: Provider, args: [string, string]) {
  try {
    const account = new SmartAccount({ address, secret: pk }, provider);
    const rawTx = await getTransaction(
      GAME_CONTRACT_ADDRESS,
      address,
      '0',
      new ethers.Interface(abi).encodeFunctionData('verifyProof', args),
      provider
    );
    const tx = await account.sendTransaction(rawTx);
    await tx.wait();
  } catch (error) {
    console.error('Error registering key in account:', error);
  }
}

export async function getTransaction(to: string, from: string, value: string, data: string, provider: Provider) {
  const gasPrice = await provider.getGasPrice();
  const chainId = (await provider.getNetwork()).chainId;
  const nonce = await provider.getTransactionCount(from);
  const overrides = await getPaymasterOverrides();
  return {
    to,
    from,
    value: ethers.parseEther(value),
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
  const paymasterParams = getPaymasterParams(PAYMASTER_CONTRACT_ADDRESS, {
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
