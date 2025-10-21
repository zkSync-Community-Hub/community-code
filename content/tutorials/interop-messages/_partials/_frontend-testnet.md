---
title: Frontend Testnet
---

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup"}

```ts [src/config/constants.ts]
:code-import{filePath="interop-messages/frontend/config/constants-testnet.ts"}
```

Update the contract addresses with your deployed contract addresses.

## Wagmi config

In the `src/config/wagmi.ts` file, update the RPC endpoints and chain IDs for match your local chains.

You will also need to update the `getContractAddress` function to return the correct contract addresses for each chain ID you configured.

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup2"}

```ts [src/utils/prove.ts]
:code-import{filePath="interop-messages/frontend/utils/prove-testnet.ts"}
```

There are three functions we've just added:

1. `checkIfTxIsFinalized`: This function checks to see if the deposit transaction has finalized.
  This can take several hours depending on the testnet.
1. `waitForChainInteropRoot`: This function fetches the interop root on gateway to check if it has been updated based on the deposit transaction yet.
1. `getProveScoreArgs`: This function takes the transaction hash input by the user in the "Mint" form
  and fetches the needed arguments to verify the message sent in the `deposit` function.

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup3"}

Now you can test the staking and tokens contracts with the frontend!

On one of the staking chains, deposit any amount of ETH (or the chain's base token) and then copy your transaction hash.
Then, view the transaction on that chain's block explorer and wait until the transaction is finalized on Ethereum (a.k.a L1).

Once the transaction is finalized,
go back to the app and select the rewards chain.
Input the transaction hash and select the staking chain you used.

Then click the mint button to mint a reward token.
Once minted, you should see the leaderboard table update.

::twitter-button{text="I just built a crosschain DeFi app with @zkSyncDevs"}
