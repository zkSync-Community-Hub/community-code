---
title: Setup 2
---

## Staking contract

Create a new file in the `contracts/contracts` folder called `Staking.sol`.

```bash
touch contracts/Staking.sol
```

Then copy and paste the staking contract:

```solidity [Staking.sol]
:code-import{filePath="interop-messages/contracts/contracts/Staking.sol"}
```

There are two functions in the staking contract: `deposit` and `withdraw`.

When a user first calls the `deposit` method, the contract sends an interop message with their encoded address.
To send the message, we use the `sendToL1` function on the `L1Messenger` contract, which is pre-deployed on every ZKsync chain at address `0x00..008008`.

The `withdraw` method simply refunds the user their deposited funds.

This contract will be deployed to multiple chains,
allowing users to choose which chain they want to stake their ETH in order to access the token reward.

## Token contract

Create a new file in the `contracts/contracts` folder called `InteropToken.sol`.

```bash
touch contracts/InteropToken.sol
```

Then copy and paste the token contract:

```solidity [InteropToken.sol]
:code-import{filePath="interop-messages/contracts/contracts/InteropToken.sol"}
```

This token contract is used to reward users for staking ETH on any of the staking contracts deployed to different chains.

In the token contract's constructor function, a list of approved staking contract addresses and their chain IDs must be defined.
We use this in the contract to make sure interop messages were sent from the correct contracts.

This contract has a mint function that takes the arguments needed for message verification.
We use the `proveL2MessageInclusionShared` method in the L2 message verification contract for verification.
This contract is deployed at `0x..10009` on each ZKsync chain.

There are a few different checks happening in the `mint` function:

1. The user has not previously claimed a reward token.
1. The interop message is verifiable.
1. The interop message was sent from an approved staking contract.
1. The interop message matches the user's address.

## Ignition scripts

Now that we have the contracts ready, let's add some ignition scripts for deploying.

### Staking ignition script

Create a new file in the `ignition/modules` folder called `Staking.ts`:

```bash
touch ignition/modules/Staking.ts
```

Then copy and paste the module below:

```ts [ignition/modules/Staking.ts]
:code-import{filePath="interop-messages/contracts/ignition/modules/Staking.ts"}
```

### Token ignition script

Create another file in the `ignition/modules` folder called `InteropToken.ts`:

```bash
touch ignition/modules/InteropToken.ts
```

Then copy and paste the module below:
