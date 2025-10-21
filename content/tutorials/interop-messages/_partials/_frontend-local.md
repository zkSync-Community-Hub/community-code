---
title: Frontend Local
---

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup"}

```ts [src/config/constants.ts]
:code-import{filePath="interop-messages/frontend/config/constants.ts"}
```

Update the contract addresses with your deployed contract addresses.

## Wagmi config

In the `src/config/wagmi.ts` file, double check that the RPC endpoints and chain IDs for match your local chains.

If you forgot these, you can find them in your `interop_ecosystem` folder.
The chain ID can be found in the `chains/<CHAIN_NAME>/ZkStack.yaml` file,
and the endpint in the `chains/<CHAIN_NAME>/configs/general.yaml` file under `api.web3_json_rpc.http_url`.

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup2"}

```ts [src/utils/prove.ts]
:code-import{filePath="interop-messages/frontend/utils/prove-local.ts"}
```

There are three functions we've just added:

1. `checkIfTxIsFinalized`: This function checks to see if the deposit transaction has finalized.
  This will take just a few minutes.
1. `waitForChainInteropRoot`: This function does a couple things.
  First, it uses the local pre-configured wallet we used for deploying contracts to send transactions on the rewards chain
  in order to seal the next batch of blocks.
  This is needed only on a local ecosystem, as there would otherwise not be any other transactions to create new blocks.
  Second, it fetches the interop root on gateway to check if it has been updated based on the deposit transaction yet.
1. `getProveScoreArgs`: This function takes the transaction hash input by the user in the "Mint" form
  and fetches the needed arguments to verify the message sent in the `deposit` function.

:display-partial{path="/tutorials/interop-messages/_partials/_frontend-setup3"}

You can send funds to your wallet using the `zkstack dev rich-account` command:

```bash
zkstack dev rich-account --chain zk_chain_1 0x<YOUR_WALLET_ADDRESS>
```

```bash
zkstack dev rich-account --chain zk_chain_2 0x<YOUR_WALLET_ADDRESS>
```

```bash
zkstack dev rich-account --chain zk_chain_3 0x<YOUR_WALLET_ADDRESS>
```

Now you can test the staking and tokens contracts with the frontend!

On one of the staking chains, deposit any amount of ETH and then copy your transaction hash.
On the rewards chain, input the transaction hash and select the staking chain you used.

Then click the mint button to mint a reward token.
This process will take a few minutes on a local ecosystem.
Once minted, you should see the leaderboard table update.

::twitter-button{text="I just built a crosschain DeFi app with @zkSyncDevs"}
