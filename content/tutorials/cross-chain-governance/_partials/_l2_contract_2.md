---
title: Cross Chain Tutorial L2 Counter Part 2
---

### Deploy L2 Counter Contract

1. Create a new file inside the `scripts` folder named `deploy.ts`.

    ```sh
    touch scripts/deploy.ts
    ```

1. Copy/paste the following code into `L2-counter/scripts/deploy.ts`, replacing `<GOVERNANCE-ADDRESS>` with the address
   of the Governance contract we just deployed:

    ```typescript [L2-counter/scripts/deploy.ts]
    :code-import{filePath="cross-chain-governance/L2-counter/scripts/deploy.ts"}
    ```

1. Now deploy the contract from the `L2-counter/` folder root to ZKsync Era Sepolia:

    ::code-group

    ```sh [npm]
    npm run deploy
    ```

    ```sh [yarn]
    yarn run deploy
    ```

    ```sh [pnpm]
    pnpm run deploy
    ```

    ```sh [bun]
    bun run deploy
    ```

    ::

    You should see an output like this:

    ```txt
    Deploying Counter contract to ZKsyncEraSepolia
    Counter deployed to 0x111C3E89Ce80e62EE88318C2804920D4c96f92bb
    ```

## Read the Counter Value

Now both contracts are deployed, we can create a script to retrieve the value of the counter.

1. Create a new file in the `scripts` folder named `display-value.ts`.

    ```sh
    touch scripts/display-value.ts
    ```

1. Copy and paste in the following code, adding the deployed counter contract address:

    ```ts [L2-counter/scripts/display-value.ts]
    :code-import{filePath="cross-chain-governance/L2-counter/scripts/display-value.ts"}
    ```

1. Run the script:

    ::code-group

    ```sh [npm]
    npx hardhat run ./scripts/display-value.ts
    ```

    ```sh [yarn]
    yarn hardhat run ./scripts/display-value.ts
    ```

    ```sh [pnpm]
    pnpm hardhat run ./scripts/display-value.ts
    ```

    ```sh [bun]
    bun hardhat run ./scripts/display-value.ts
    ```

    ::

    The output should be:

    ```txt
    The counter value is 0
    ```
