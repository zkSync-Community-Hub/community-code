---
title: Cross Chain Tutorial on Testnet Part 1
---

## Prerequisites

- A wallet with sufficient Sepolia `%%zk_testnet_currency_symbol%%` on Ethereum and %%zk_testnet_name%% to pay for deploying smart
  contracts. You can get Sepolia ETH from the [network faucets](https://docs.zksync.io/ecosystem/network-faucets).
  - Get testnet `ETH` for ZKsync Era using [bridges](https://zksync.io/explore#bridges) to bridge funds to ZKsync.
- You know how to get your [private key from your MetaMask wallet](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).
- You must have [Node.js](https://github.com/nvm-sh/nvm) installed.

:display-partial{path="/tutorials/cross-chain-governance/_partials/_intro"}

### Deploy L1 Governance Contract

Create the file `L1-Governance/.env` and copy/paste the code below, filling in the relevant values.
Find node provider urls [here](https://chainlist.org/chain/11155111).
You have to connect your wallet to the network and add the network to the wallet in advance.

  ```txt [L1-Governance/.env]
  :code-import{filePath="cross-chain-governance/L1-governance/.env.example"}
  ```

:display-partial{path="/tutorials/cross-chain-governance/_partials/_deploy"}
