---
title: Setup 3
---

### Deploy the Token Contract

Update the approved staking contract addresses in the `ignition/modules/InteropToken.ts` file.

The contract addresses can be found in your `ignition/deployments` folder in the `deployed_addresses.json` file for each chain.

Then deploy the `InteropToken` contract:

::code-group

```bash [npm]
npm run deploy:token
```

```bash [yarn]
yarn deploy:token
```

```bash [pnpm]
pnpm deploy:token
```

```bash [bun]
bun deploy:token
```

::

Now that we have all the contracts deployed, we can integrate them with the frontend in the next section.
