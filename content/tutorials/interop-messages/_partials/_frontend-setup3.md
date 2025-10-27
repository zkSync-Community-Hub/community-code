---
title: Frontend Setup3
---

## Handling Verification

The last change we need to make is updating the `handleSubmit` function
in the `MintForm` component.

The full flow for minting the token looks like this:

1. The user inputs the transaction hash from their deposit transaction, and selects which staking chain they used.
1. The appropriate staking contract address is fetched from our constants file.
1. The `handleSubmit` function waits until the transaction is finalized.
1. The `handleSubmit` function waits until the interop root on gateway is updated.
1. The `handleSubmit` function fetches the input arguments for the `mint` function.
1. The user is prompted to approve calling the `mint` function with their wallet.
1. The transaction gets approved, and the leaderboard table gets updated with the latest number of mints per chain.

In `components/MintForm.tsx`, update the `handleSubmit` function with the completed function below:

```ts [src/components/MintForm.tsx]
:code-import{filePath="interop-messages/frontend/components/MintForm.tsx:submit"}
```

## Run the app

Use the command below to run the frontend.

::code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm dev
```

```bash [bun]
bun dev
```

::

You can now open the frontend at [`http://localhost:5173/`](http://localhost:5173/).

On the frontend, you should be able to add each network to your wallet by clicking on them from the dropdown menu.
