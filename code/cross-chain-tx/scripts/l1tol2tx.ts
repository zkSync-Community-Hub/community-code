import { ethers, network } from 'hardhat';
import GREETER_ABI_JSON from '../artifacts-zk/contracts/Greeter.sol/Greeter.json';

// ANCHOR: contract-address
// L2 contract address on ZKsync sepolia
// const L2_CONTRACT_ADDRESS = '0x543A5fBE705d040EFD63D9095054558FB4498F88';
const L2_CONTRACT_ADDRESS = '0x543A5fBE705d040EFD63D9095054558FB4498F88';
// ANCHOR_END: contract-address

async function main() {
  // ANCHOR: providers
  const [wallet] = await ethers.getWallets();

  // Initialize the L2 provider.
  const l2Provider = ethers.providerL2;

  // Initialize the L1 provider.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const networkInfo = network as any;
  const l1RPCEndpoint =
    networkInfo.config.ethNetwork === 'http://localhost:8545'
      ? networkInfo.config.ethNetwork
      : '<YOUR_L1_RPC_ENDPOINT>';
  const l1Provider = new ethers.Provider(l1RPCEndpoint);
  // ANCHOR_END: providers

  // ANCHOR: gas-price
  // retrieve L1 gas price
  const l1GasPrice = await l1Provider.getGasPrice();
  console.log(`L1 gasPrice ${ethers.formatEther(l1GasPrice)} ETH`);
  // ANCHOR_END: gas-price

  // ANCHOR: pop-tx
  const contract = new ethers.Contract(L2_CONTRACT_ADDRESS, GREETER_ABI_JSON.abi, wallet);
  const message = `Message sent from L1 at ${new Date().toUTCString()}`;
  // populate tx object
  const tx = await contract.setGreeting.populateTransaction(message);
  // ANCHOR_END: pop-tx

  // ANCHOR: gas-limit
  // Estimate gas limit for L1-L2 tx
  const l2GasLimit = await l2Provider.estimateGasL1(tx);
  console.log(`L2 gasLimit ${l2GasLimit.toString()}`);
  // ANCHOR_END: gas-limit

  // ANCHOR: base-cost
  const baseCost = await wallet.getBaseCost({
    // L2 computation
    gasLimit: l2GasLimit,
    // L1 gas price
    gasPrice: l1GasPrice,
  });

  console.log(`Executing this transaction will cost ${ethers.formatEther(baseCost)} ETH`);
  // ANCHOR_END: base-cost

  // ANCHOR: iface
  const iface = new ethers.Interface(GREETER_ABI_JSON.abi);
  const calldata = iface.encodeFunctionData('setGreeting', [message]);
  // ANCHOR_END: iface

  // ANCHOR: request-execute
  const txReceipt = await wallet.requestExecute({
    // destination contract in L2
    contractAddress: L2_CONTRACT_ADDRESS,
    calldata,
    l2GasLimit: l2GasLimit,
    refundRecipient: wallet.address,
    overrides: {
      // send the required amount of ETH
      value: baseCost,
      gasPrice: l1GasPrice,
    },
  });

  console.log('txReceipt :>> ', txReceipt);
  console.log(`L1 tx hash is ${txReceipt.hash}`);
  console.log('🎉 Transaction sent successfully');
  txReceipt.wait(1);
  // ANCHOR_END: request-execute
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
