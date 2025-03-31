---
title: L1->L2 Run
---

Next, execute the script by running:

::code-group

```bash [npm]
npx hardhat run scripts/l1tol2tx.ts
```

```bash [yarn]
yarn hardhat run scripts/l1tol2tx.ts
```

```bash [pnpm]
pnpm hardhat run scripts/l1tol2tx.ts
```

```bash [bun]
bun hardhat run scripts/l1tol2tx.ts
```

::

You should see the following output:

```bash
L1 gasPrice 0.00000000321159928 ETH
L2 gasLimit 0xa4910
Executing this transaction will cost 0.000195576293213424 ETH
L1 tx hash is 0x69a382f7157772f24984c4985e81258e7d5dfc2f0ba762a6cff41304e8987d9c
🎉 Transaction sent successfully
```

This indicates the transaction is submitted to the L1 and will later on be executed on L2.

To verify this, wait until the transaction is finalized, and try running the `interact.ts` script.
You can remove the second part of the script so that it just checks the value of the `greet` function.

::code-group

```bash [npm]
npm run interact
```

```bash [yarn]
yarn interact
```

```bash [pnpm]
pnpm interact
```

```bash [bun]
bun interact
```

::

You should see in the logs your message sent from the L1.

```bash
Running script to interact with contract 0x543A5fBE705d040EFD63D9095054558FB4498F88
Current message is: Message sent from L1 at <CURRENT_DATE>
```
