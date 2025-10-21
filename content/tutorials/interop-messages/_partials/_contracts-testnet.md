---
title: Contracts Testnet
---

:display-partial{path="/tutorials/interop-messages/_partials/_setup"}

```ts [hardhat.config.ts]
:code-import{filePath="interop-messages/contracts/hardhat.config.testnet.ts"}
```

For each chain we are using `configVariable('<WALLET_PRIVATE_KEY_NAME>')` for the deployer accounts.
Right now these are configured to different accounts in the keystore, but you can change them as needed.

To configure this using Hardhat keystore,
run the command below:

::code-group

```bash [npm]
npx hardhat keystore set <WALLET_PRIVATE_KEY_NAME>
```

```bash [yarn]
yarn hardhat keystore set <WALLET_PRIVATE_KEY_NAME>
```

```bash [pnpm]
pnpm hardhat keystore set <WALLET_PRIVATE_KEY_NAME>
```

```bash [bun]
bun hardhat keystore set <WALLET_PRIVATE_KEY_NAME>
```

::

If you have previously used Hardhat keystore, it will ask you to enter your password.
If you haven't you will be prompted to set up a new password.

Then, input the private key a wallet with testnet funds for each chain.

:display-partial{path="/tutorials/interop-messages/_partials/_setup2"}

```ts [ignition/modules/InteropToken.ts]
:code-import{filePath="interop-messages/contracts/ignition/modules/InteropTokenTestnet.ts"}
```

## Deploying the contracts

Add some scripts to `package.json` to make it easier to compile and deploy the contracts:

```json [package.json]
"scripts": {
  "compile": "hardhat compile",
  "deploy:abstract": "hardhat ignition deploy ignition/modules/Staking.ts --network abstract",
  "deploy:lens": "hardhat ignition deploy ignition/modules/Staking.ts --network lens",
  "deploy:sophon": "hardhat ignition deploy ignition/modules/Staking.ts --network sophon",
  "deploy:token": "hardhat ignition deploy ignition/modules/InteropToken.ts --network era"
},
```

Here we are deploying the token contract to ZKsync Era Sepolia, and the staking contracts to Abstract, Lens, and Sophon,
but you can change the networks if you want.

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
npm run deploy:abstract
```

```bash [yarn]
yarn deploy:abstract
```

```bash [pnpm]
pnpm deploy:abstract
```

```bash [bun]
bun deploy:abstract
```

::

::code-group

```bash [npm]
npm run deploy:lens
```

```bash [yarn]
yarn deploy:lens
```

```bash [pnpm]
pnpm deploy:lens
```

```bash [bun]
bun deploy:lens
```

::

::code-group

```bash [npm]
npm run deploy:sophon
```

```bash [yarn]
yarn deploy:sophon
```

```bash [pnpm]
pnpm deploy:sophon
```

```bash [bun]
bun deploy:sophon
```

::

:display-partial{path="/tutorials/interop-messages/_partials/_setup3"}
