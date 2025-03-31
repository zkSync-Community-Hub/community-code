---
title: L1->L2 Main
---

## Step-by-step

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

Create a new script file in the `scripts` folder called `l1tol2tx.ts`, and copy/paste the full script.

```bash
touch scripts/l1tol2tx.ts
```

::drop-panel
  ::panel{label="Click to show L1-L2 full script"}
    ```ts [l1tol2tx.ts]
    :code-import{filePath="cross-chain-tx/scripts/l1tol2tx.ts"}
    ```
  ::
::
