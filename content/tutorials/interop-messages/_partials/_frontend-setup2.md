---
title: Frontend Setup2
---

## Interop utils

Create a new folder called `utils` in the `src` folder.

```bash
mkdir src/utils
```

Then create a file called `prove.ts` in that folder:

```bash
touch src/utils/prove.ts
```

This is where we will implement the logic for fetching the input arguments for the `mint` function,
and making sure an interop message is ready to be verified.

Once the user deposits some ETH to a staking contract,
they will be able to submit their transaction hash to a "Mint" form on the rewards chain,
and we can use the transaction hash to fetch the required input arguments for onchain message verification.

Before the message can be verified, though,
the transaction must be finalized,
and the interop roots on gateway and the rewards chain must be updated.
We will add some functions below to check these statuses, and fetch the input arguments for minting.

Copy and paste the functions below:
