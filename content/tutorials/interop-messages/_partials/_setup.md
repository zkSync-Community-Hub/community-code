---
title: Setup
---

Before writing our contracts, clone the template repo that has the UI for the frontend already setup:

<!-- // cspell: disable -->
```bash
git clone https://github.com/sarahschwartz/interop-messages-defi-demo.git
cd interop-messages-defi-demo
```
<!-- // cspell: enable -->

Create another folder called `contracts` and move inside this folder:

```bash
mkdir contracts
cd contracts
```

Initialize a new hardhat project in the `contracts` folder:

```bash
npx hardhat --init
```

Select the options to use `Hardhat 3` and a
`TypeScript` project using `Mocha and Ethers.js`.
Select yes to install all of the default dependencies.

Once the project is initialized,
you can delete the template files in the `contracts`, `ignition/modules`, `scripts`, and `tests` folders.

```bash
rm -rf ./contracts/*
rm -rf ./ignition/modules/*
rm -rf ./scripts/*
rm -rf ./test/*
```

To make the interop script more straightforward,
we can use the `zksync-ethers` and `zksync-contracts` SDKs.

Inside the hardhat project, run the command below to install these dependencies:

::code-group

```bash [npm]
npm install -D zksync-ethers @matterlabs/zksync-contracts
```

```bash [yarn]
yarn add -D zksync-ethers @matterlabs/zksync-contracts
```

```bash [pnpm]
pnpm add -D zksync-ethers @matterlabs/zksync-contracts
```

```bash [bun]
bun add -D zksync-ethers @matterlabs/zksync-contracts
```

::

## Hardhat config

Next, update the `hardhat.config.ts` file to configure our local or testnet networks:
