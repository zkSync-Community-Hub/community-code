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
0x3d3cbc973389cb26f657686445bcc75662b415b656078503592ac8c1abb8810e
```

Configure the ZKsync CLI to use a **Dockerized node**.
Open Docker desktop so Docker is running in background.

```bash
npx zksync-cli dev config
```

Start the nodes:

```bash
npx zksync-cli dev start
```

Deploy the `Greeter` contract:

::code-group

```bash [npm]
npm run deploy
```

```bash [yarn]
yarn run deploy
```

```bash [pnpm]
pnpm run deploy
```

```bash [bun]
bun run deploy
```

::

Save the contract address to use later.

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_main"}
