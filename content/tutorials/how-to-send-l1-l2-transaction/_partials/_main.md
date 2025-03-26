---
title: L1->L2 Main
---

## Step-by-step

Create a new script file in the `scripts` folder called `l1tol2tx.ts`:

```bash
touch scripts/l1tol2tx.ts
```

Sending an L1->L2 transaction requires following these steps:

1. Initialise the providers and the wallet that will send the transaction:

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:providers"}
    ```

1. Retrieve the current gas price on L1.

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:gas-price"}
    ```

1. Populate the transaction that you want to execute on L2:

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:pop-tx"}
    ```

1. Retrieve the gas limit for sending the populated transaction to L2 using `estimateGasL1()`.
This function calls the `zks_estimateGasL1ToL2` RPC method under the hood:

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:gas-limit"}
    ```

1. Calculate the total transaction fee to cover the cost of sending the
  transaction on L1 and executing the transaction on L2 using
  `getBaseCost` from the `Wallet` class. This method:

   - Retrieves the ZKsync BridgeHub contract address by calling `zks_getBridgehubContract` RPC method.
   - Calls the `l2TransactionBaseCost` function on the ZKsync BridgeHub system contract to retrieve the fee.

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:base-cost"}
    ```

1. Encode the transaction calldata:

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:iface"}
    ```

1. Finally, send the transaction from your wallet using the `requestExecute` method. This helper method:

   - Retrieves the Zksync BridgeHub contract address calling `zks_getBridgehubContract`.
   - Populates the L1-L2 transaction.
   - Sends the transaction to the `requestL2TransactionDirect` function of the ZKsync BridgeHub system contract on L1.

    ```ts
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts:request-execute"}
    ```

## Full example

Create a `send-l1-l2-tx.ts` file in the root directory with the following script:

::drop-panel
  ::panel{label="Click to show L1-L2 full script"}

  ```ts [send-l1-l2-tx.ts]
    import { Contract, Wallet, Provider, types } from "zksync-ethers";
    import * as ethers from "ethers";

    // load env file
    import dotenv from "dotenv";
    dotenv.config();

    // Greeter contract ABI for example
    const ABI = [
      {
        inputs: [],
        name: "greet",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_greeting",
            type: "string",
          },
        ],
        name: "setGreeting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    // RPC endpoints
    const L1_RPC_ENDPOINT = "https://rpc2.sepolia.org"; // Check chainlist.org
    const L2_RPC_ENDPOINT = "https://sepolia.era.zksync.dev";

    const WALLET_PRIV_KEY = process.env.WALLET_PRIVATE_KEY || "";

    if (!WALLET_PRIV_KEY) {
      throw new Error("Wallet private key is not configured in env file");
    }

    // Example Greeter contract on ZKsync Sepolia Testnet
    const L2_CONTRACT_ADDRESS = "0x543A5fBE705d040EFD63D9095054558FB4498F88"; 

    async function main() {
      console.log(`Running script for L1-L2 transaction`);

      // Initialize the wallet.
      const l1provider = new Provider(L1_RPC_ENDPOINT);
      const l2provider = new Provider(L2_RPC_ENDPOINT);
      const wallet = new Wallet(WALLET_PRIV_KEY, l2provider, l1provider);

      // retrieve L1 gas price
      const l1GasPrice = await l1provider.getGasPrice();
      console.log(`L1 gasPrice ${ethers.formatEther(l1GasPrice)} ETH`);

      const contract = new Contract(L2_CONTRACT_ADDRESS, ABI, wallet);
      const msg = await contract.greet();
      console.log(`Message in contract is ${msg}`);

      const message = `Message sent from L1 at ${new Date().toUTCString()}`;
      let tx = await contract.setGreeting.populateTransaction(message);

      tx = {
        ...tx,
        from: wallet.address,
      }

      // call to RPC method zks_estimateGasL1ToL2 to estimate L2 gas limit
      const l1l2GasLimit = await l2provider.estimateGasL1(tx);
      console.log(`L2 gasLimit ${BigInt(l1l2GasLimit)}`);

      const baseCost = await wallet.getBaseCost({
        // L2 computation
        gasLimit: l1l2GasLimit,
        // L1 gas price
        gasPrice: l1GasPrice,
      });

      console.log(`Executing this transaction will cost ${ethers.formatEther(baseCost)} ETH`);

      const iface = new ethers.Interface(ABI);
      const calldata = iface.encodeFunctionData("setGreeting", [message]);

      const txReceipt = await wallet.requestExecute({
        contractAddress: L2_CONTRACT_ADDRESS,
        calldata,
        l2GasLimit: l1l2GasLimit,
        refundRecipient: wallet.address,
        overrides: {
          // send the required amount of ETH
          value: baseCost,
          gasPrice: l1GasPrice,
        },
      });

      console.log('txReceipt :>> ', txReceipt);
      console.log(`L1 tx hash is ${txReceipt.hash}`);
      console.log("🎉 Transaction sent successfully");
      txReceipt.wait(1);
    }

    main()
      .then()
      .catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });
    ```
  ::
::

Execute the script by running:

```bash
ts-node send-l1-l2-tx.ts
```

You should see the following output:

```bash
Running script for L1-L2 transaction
L2 Balance is 1431116173253819600
L1 gasPrice 0.000000003489976197 ETH
Message in contract is Hello world!
L2 gasLimit 17207266
Executing this transaction will cost 0.005052478351484732 ETH
L1 tx hash is :>>  0x088700061730e84c316fa07296839263a420b65237fd0fd6a147b3d76affef76
🎉 Transaction sent successfully

```

This indicates the transaction is submitted to the L1 and will later on be executed on L2.
