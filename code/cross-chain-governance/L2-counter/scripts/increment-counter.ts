import { ethers } from 'hardhat';
import { utils } from 'zksync-ethers';
import * as GOVERNANCE_ABI_JSON from '../../L1-governance/artifacts/contracts/Governance.sol/Governance.json';
import * as COUNTER_ABI_JSON from '../artifacts-zk/contracts/Counter.sol/Counter.json';

const COUNTER_ADDRESS = process.env.COUNTER_ADDRESS ?? '<COUNTER_ADDRESS>';
const GOVERNANCE_ADDRESS = process.env.GOVERNANCE_ADDRESS ?? '<GOVERNANCE-ADDRESS>';

async function main() {
  const l1Provider = ethers.providerL1;
  // Set up the Governor wallet to be the same as the one that deployed the governance contract.
  const [wallet] = await ethers.getWallets();
  // Set a constant that accesses the Layer 1 contract.
  const govcontract = await ethers.getContractAt(GOVERNANCE_ABI_JSON.abi, GOVERNANCE_ADDRESS, wallet);

  // Initialize the L2 provider.
  const l2Provider = ethers.providerL2;
  // Get the current address of the ZKsync L1 bridge.
  const zkSyncAddress = await l2Provider.getMainContractAddress();
  // Get the `Contract` object of the ZKsync bridge.
  // const zkSyncContract = new Contract(zkSyncAddress, utils.ZKSYNC_MAIN_ABI, wallet);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zksyncABI: any = utils.ZKSYNC_MAIN_ABI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zkSyncContract = await ethers.getContractAt(zksyncABI as any[], zkSyncAddress, wallet);

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
  // baseCost takes the price and limit and formats the total in wei.
  // For more information on `REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT` see the [fee model documentation](../developer-guides/transactions/fee-model.md).
  const baseCost = await zkSyncContract.l2TransactionBaseCost(
    gasPrice,
    gasLimit,
    utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT
  );

  // !! If you don't include the gasPrice and baseCost in the transaction, a re-estimation of fee may generate errors.
  const tx = await govcontract.callZkSync(
    zkSyncAddress,
    COUNTER_ADDRESS,
    data,
    gasLimit,
    utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT,
    {
      // Pass the necessary ETH `value` to cover the fee for the operation
      value: baseCost,
      gasPrice,
    }
  );

  // Wait until the L1 tx is complete.
  await tx.wait();

  // Get the TransactionResponse object for the L2 transaction corresponding to the execution call.
  const l2Response = await l2Provider.getL2TransactionFromPriorityOp(tx);

  // Output the receipt of the L2 transaction corresponding to the call to the counter contract.
  const l2Receipt = await l2Response.wait();
  console.log(l2Receipt);
}

// We recommend always using this async/await pattern to properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
