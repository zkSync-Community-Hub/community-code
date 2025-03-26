---
title: L1->L2 transaction Testnet
---

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_reqs"}

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_testnet_reqs"}

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_intro"}

In the root folder, add a `.env` file with the private key of the wallet to use:

```md
WALLET_PRIVATE_KEY=0x..;
```

::callout{icon="i-heroicons-exclamation-triangle"}
Always use a separate wallet with no real funds for development.
Make sure your `.env` file is not pushed to an online repository by adding it to a `.gitignore` file.
::

:display-partial{path="/tutorials/how-to-send-l1-l2-transaction/_partials/_main"}
