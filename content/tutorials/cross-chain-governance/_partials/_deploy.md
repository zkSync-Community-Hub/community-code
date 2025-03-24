---
title: Cross Chain Tutorial Deploying
---

Replace the code in `hardhat.config.ts` with the following:

```ts [L1-Governance/hardhat.config.ts]
:code-import{filePath="cross-chain-governance/L1-governance/hardhat.config.ts"}
```

Next, create the file `Governance.ts` inside the `/ignition/modules` folder and copy/paste the following code into it:

```sh
touch ignition/modules/Governance.ts
```

```ts [L1-Governance/ignition/modules/Governance.ts]
:code-import{filePath="cross-chain-governance/L1-governance/ignition/modules/Governance.ts"}
```

Then, from the `L1-governance` folder root, compile and deploy the contract:

::code-group

```sh [npm]
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/Governance.ts --network sepolia
```

```sh [yarn]
yarn hardhat compile
yarn hardhat ignition deploy ./ignition/modules/Governance.ts --network sepolia
```

```sh [pnpm]
pnpm hardhat compile
pnpm hardhat ignition deploy ./ignition/modules/Governance.ts --network sepolia
```

```sh [bun]
bun hardhat compile
bun hardhat ignition deploy ./ignition/modules/Governance.ts --network sepolia
```

::

You should see the following output:

```sh
Deploying [ GovernanceModule ]
Batch #1
  Executed GovernanceModule#Governance

[ GovernanceModule ] successfully deployed 🚀

Deployed Addresses

GovernanceModule#Governance - 0xA7d27A1202bE1237919Cf2cb60970141100725b4
```

Save the address to use in a later step.
