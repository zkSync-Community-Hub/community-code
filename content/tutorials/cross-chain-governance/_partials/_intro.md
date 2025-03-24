---
title: Cross Chain Tutorial Intro
---

### Complete Project

Download the [complete project on GitHub](https://github.com/zksync-community-hub/community-code/tree/main/code/cross-chain-governance).

## Project Setup

Open a terminal window, create a new folder for the project tutorial, e.g. `mkdir cross-chain-tutorial`, and `cd` into
the folder.

Now create separate folders to store contracts and scripts on L1 and L2. For now we will start with L1-governance
folder.

```sh
mkdir L1-governance
```

::callout{icon="i-heroicons-exclamation-circle"}
The `L1-governance` code is a default Hardhat project used to deploy a contract on L1.
The `L2-counter` code includes all ZKsync dependencies and configurations for L2.
::

## L1 Governance

1. `cd` into the `L1-governance` folder.

  ```sh
  cd L1-governance
  ```

1. Initialise and set up the L1 project.

  ```sh
  npx hardhat init
  ```

  Select the option **Create a Typescript project** and accept the defaults for everything else.

::callout{icon="i-heroicons-exclamation-circle"}
To interact with the ZKsync bridge contract using Solidity, you need
the ZKsync contract interface. There are two ways to get it:

- Import it from the `@matterlabs/zksync-contracts` npm package (preferred).
- Download it from the [contracts repo](https://github.com/matter-labs/era-contracts).

::

1. Install the following dependencies:

  ::code-group

  ```bash [npm]
  npm i -D typescript ts-node @openzeppelin/contracts @matterlabs/zksync-contracts@beta @nomicfoundation/hardhat-ethers @typechain/ethers-v6 @typechain/hardhat typechain ethers dotenv
  ```

  ```bash [yarn]
  yarn add -D typescript ts-node @openzeppelin/contracts @matterlabs/zksync-contracts@beta @nomicfoundation/hardhat-ethers @typechain/ethers-v6 @typechain/hardhat typechain ethers dotenv
  ```

  ```bash [pnpm]
  pnpm add -D typescript ts-node @openzeppelin/contracts @matterlabs/zksync-contracts@beta @nomicfoundation/hardhat-ethers @typechain/ethers-v6 @typechain/hardhat typechain ethers dotenv
  ```

  ```bash [bun]
  bun add -D typescript ts-node @openzeppelin/contracts @matterlabs/zksync-contracts@beta @nomicfoundation/hardhat-ethers @typechain/ethers-v6 @typechain/hardhat typechain ethers dotenv
  ```

  ::

### Create L1 Governance Contract

::callout{icon="i-heroicons-light-bulb"}
Make sure you're still in the `L1-governance` folder.
::

The following Solidity code defines the Governance smart contract.

The constructor sets the contract creator as the single governor.
The `callZkSync` function calls a transaction on L2 which can only be called by the governor.

1. Remove the existing `/test` directory and any contracts that exist in `/contracts`.

1. Create a new file called `Governance.sol` inside the empty `contracts` folder.

  ```sh
  touch contracts/Governance.sol
  ```

1. Copy/paste the code below into it.

```solidity [L1-governance/contracts/Governance.sol]
:code-import{filePath="cross-chain-governance/L1-governance/contracts/Governance.sol"}
```
