import { ethers, network } from 'hardhat';
import { utils } from 'zksync-ethers';
import * as COUNTER_ABI_JSON from '../artifacts-zk/contracts/Counter.sol/Counter.json';
import * as GOVERNANCE_ABI_JSON from '../../L1-governance/artifacts/contracts/Governance.sol/Governance.json';
import { Wallet } from 'ethers';

const COUNTER_ADDRESS = process.env.COUNTER_ADDRESS ?? '<COUNTER_ADDRESS>';
const GOVERNANCE_ADDRESS = process.env.GOVERNANCE_ADDRESS ?? '<GOVERNANCE-ADDRESS>';

async function main() {
  // Set up the Governor wallet to be the same as the one that deployed the governance contract.
  const [wallet] = await ethers.getWallets();

  // Initialize the L2 provider.
  const l2Provider = new ethers.Provider(network.config.url);

  // Initialize the L1 provider.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const networkInfo = network as any;
  const l1RPCEndpoint =
    networkInfo.config.ethNetwork === 'http://localhost:8545'
      ? networkInfo.config.ethNetwork
      : '<YOUR_L1_RPC_ENDPOINT>';
  const l1Provider = new ethers.Provider(l1RPCEndpoint);

  // Encoding the L1 transaction is done in the same way as it is done on Ethereum.
  // Use an Interface which gives access to the contract functions.
  const counterInterface = new ethers.Interface(COUNTER_ABI_JSON.abi);
  const data = counterInterface.encodeFunctionData('increment', []);

  // The price of an L1 transaction depends on the gas price used.
  // You should explicitly fetch the gas price before making the call.
  const gasPrice = await l1Provider.getGasPrice();

  // Define a constant for gas limit which estimates the limit for the L1 to L2 transaction.
  const gasLimit = await l2Provider.estimateL1ToL2Execute({
    contractAddress: COUNTER_ADDRESS,
    calldata: data,
    caller: utils.applyL1ToL2Alias(GOVERNANCE_ADDRESS),
  });

  // Get the current address of the ZKsync L1 Bridge Hub.
  const bridgeHubAddress = await l2Provider.getBridgehubContractAddress();

  const l1ConnectedWallet = new Wallet(wallet.privateKey, l1Provider);
  // Get the `Contract` object of the ZKsync Bridge Hub.
  const bridgeHubContract = new ethers.Contract(bridgeHubAddress, utils.BRIDGEHUB_ABI, l1ConnectedWallet);

  // Set a constant that accesses the Layer 1 governance contract.
  const govcontract = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI_JSON.abi, l1ConnectedWallet);

  // Get the L2 chain ID
  const chainId = (await l2Provider.getNetwork()).chainId;

  // Get the base cost of the transaction.
  const baseCost = await bridgeHubContract.l2TransactionBaseCost(
    chainId,
    gasPrice,
    gasLimit,
    utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT
  );

  // Call the governance contract to increment the counter.
  const l2Response = await govcontract.callZkSync(
    chainId,
    bridgeHubAddress,
    COUNTER_ADDRESS,
    data,
    gasLimit,
    utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT,
    baseCost,
    { gasPrice, value: baseCost }
  );
  const l2Receipt = await l2Response.wait();
  console.log(l2Receipt);
  console.log(l2Receipt.status === 1 ? 'Successfully incremented the counter' : 'Transaction failed');
}

// We recommend always using this async/await pattern to properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
