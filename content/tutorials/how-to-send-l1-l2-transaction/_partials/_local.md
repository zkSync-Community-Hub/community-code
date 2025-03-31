---
title: L1->L2 transaction Local
---

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_reqs"}

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_intro"}

For the private key prompt, you can use one of the
[pre-configured rich wallets](https://docs.zksync.io/zksync-era/tooling/local-setup/dockerized-l1-l2-nodes#pre-configured-rich-wallets)
like the example below:

```shell
? Private key of the wallet responsible for deploying contracts (optional)
0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110
```

Next, you need to configure the ZKsync CLI to use a **Dockerized node**.

```bash
npx zksync-cli dev config
```

Then, open Docker desktop so Docker is running in background,
and start the nodes:

```bash
npx zksync-cli dev start
```

Once the node is running, change the default network in your `hardhat.config.ts` file to `dockerizedNode`.

```ts [hardhat.config.ts]
  defaultNetwork: 'dockerizedNode',
```

Let's use the default `Greeter` contract in the template to use for testing.
Deploy the `Greeter` contract using the commands below:

::code-group

```bash [npm]
npm run compile
npm run deploy
```

```bash [yarn]
yarn compile
yarn run deploy
```

```bash [pnpm]
pnpm compile
pnpm run deploy
```

```bash [bun]
bun compile
bun run deploy
```

::

Save the contract address to use later.

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_main"}

Update the `L2_CONTRACT_ADDRESS` variable with your deployed `Greeter` contract address.

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_run"}
