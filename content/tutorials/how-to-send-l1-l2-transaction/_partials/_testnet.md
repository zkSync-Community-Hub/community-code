---
title: L1->L2 transaction Testnet
---

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_reqs"}

- L1 RPC endpoint: to broadcast the L1->L2 transaction to the network.
  You can find [public Sepolia RPC endpoints in Chainlist](https://chainlist.org/chain/11155111).
- L1 Account with ETH to pay the gas fees. Use any of the [listed Sepolia faucets](https://docs.zksync.io/ecosystem/network-faucets#sepolia-faucets).

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_intro"}

In the root folder, add a `.env` file with the private key of the wallet to use:

```md
WALLET_PRIVATE_KEY=0x..;
```

::callout{icon="i-heroicons-exclamation-triangle"}
Always use a separate wallet with no real funds for development.
Make sure your `.env` file is not pushed to an online repository by adding it to a `.gitignore` file.
::

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_main"}

You'll need to update `<YOUR_L1_RPC_ENDPOINT>` with your RPC endpoint.

The deployed contract address on Zksync Sepolia testnet is already in the script file.
To import the ABI file from the template `Greeter` contract,
run the command below to compile the contract.

::code-group

```bash [npm]
npm run compile
```

```bash [yarn]
yarn compile
```

```bash [pnpm]
pnpm compile
```

```bash [bun]
bun compile
```

::

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_run"}
