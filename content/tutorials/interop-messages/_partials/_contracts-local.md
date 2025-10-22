---
title: Contracts Local
---

:display-partial{path="/tutorials/interop-messages/_partials/_setup"}

```ts [hardhat.config.ts]
:code-import{filePath="interop-messages/contracts/hardhat.config.ts"}
```

For each chain we are using `configVariable('WALLET_PRIVATE_KEY')` for the deployer account.

To configure your private key using Hardhat keystore,
run the command below:

::code-group

```bash [npm]
npx hardhat keystore set WALLET_PRIVATE_KEY
```

```bash [yarn]
yarn hardhat keystore set WALLET_PRIVATE_KEY
```

```bash [pnpm]
pnpm hardhat keystore set WALLET_PRIVATE_KEY
```

```bash [bun]
bun hardhat keystore set WALLET_PRIVATE_KEY
```

::

If you have previously used Hardhat keystore, it will ask you to enter your password.
If you haven't you will be prompted to set up a new password.

Then, input the private key for the pre-configured rich wallet we bridged funds to in the previous section:

```bash
0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110
```

:display-partial{path="/tutorials/interop-messages/_partials/_setup2"}

```ts [ignition/modules/InteropToken.ts]
:code-import{filePath="interop-messages/contracts/ignition/modules/InteropTokenLocal.ts"}
```

## Deploying the contracts

Add some scripts to `package.json` to make it easier to compile and deploy the contracts:

```json [package.json]
"scripts": {
  "compile": "hardhat compile",
  "deploy:stakingChain1": "hardhat ignition deploy ignition/modules/Staking.ts --network stakingChain1",
  "deploy:stakingChain2": "hardhat ignition deploy ignition/modules/Staking.ts --network stakingChain2",
  "deploy:token": "hardhat ignition deploy ignition/modules/InteropToken.ts --network rewardsChain"
},
```

Now you can compile the contracts with:

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

Then deploy the staking contract to the staking chains:

::code-group

```bash [npm]
npm run deploy:stakingChain1
```

```bash [yarn]
yarn deploy:stakingChain1
```

```bash [pnpm]
pnpm deploy:stakingChain1
```

```bash [bun]
bun deploy:stakingChain1
```

::

::code-group

```bash [npm]
npm run deploy:stakingChain2
```

```bash [yarn]
yarn deploy:stakingChain2
```

```bash [pnpm]
pnpm deploy:stakingChain2
```

```bash [bun]
bun deploy:stakingChain2
```

::
