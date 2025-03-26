# 🔓 L1 Access Key → L2 Vault Unlocker

This tutorial demonstrates how to send an L1 transaction that triggers a state change on an L2 ZKsync contract using the **Bridgehub**. We'll deploy an
**AccessKey** contract on a local `anvil` node (L1) and a **Vault*
contract on a local `anvil-zksync` node (L2). The L1 contract acts as an access gate, unlocking the vault on L2.

---

## ✨ What You'll Learn

- How to deploy smart contracts on both L1 and L2 locally using `anvil-zksync`
- How to send L1 → L2 messages

---

## 🔧 Setup

1. **Install Foundry-ZKsync**

   Install `foundry-zksync` which ships with `anvil-zksync` [here](https://foundry-book.zksync.io/getting-started/installation#using-foundryup-zksync).

2. **Install dependencies**

    Navigate to `l1-access`:

   ```bash
   forge soldeer install
   ```

    Navigate to `l2-vault`:

   ```bash
   forge soldeer install
   ```

3. **Configure `.env`**

   ```env
   PRIVATE_KEY=0x...
   ACCESS_KEY_ADDRESS=0x...     # deployed L1 AccessKey contract
   VAULT_ADDRESS=0x...          # deployed L2 Vault contract
   BRIDGE_HUB_ADDRESS=0x...     # ZKsync Bridgehub on L1
   L2_CHAIN_ID=260              # e.g. anvil-zksync chainID (Default 260)
   ```

   Run:

   ```bash
   source .env
   ```

   To fetch the BridgeHub address:

   ```bash
   curl --request POST \
    --url http://localhost:8011 \
    --header 'Content-Type: application/json' \
    --data '{
      "jsonrpc": "2.0",
      "id": 1,
      "method": "zks_getBridgehubContract",
      "params": []
    }'
   ```

---

## 🚀 Deploy

### 1. Deploy AccessKey (L1)

```bash
forge script script/DeployAccessKey.s.sol:DeployAccessKey \
  --rpc-url anvil-zksync-l1 \
  --broadcast \
  --private-key $PRIVATE_KEY
```

### 2. Deploy Vault (L2)

Make sure to alias the AccessKey address when deploying to L2:

```bash
forge script script/DeployVault.s.sol:DeployVault \
  --rpc-url anvil-zksync-l2 \
  --broadcast \
  --private-key $PRIVATE_KEY
```

---

## 🔄 Trigger L2 Call from L1

This script sends the L1→L2 message via Bridgehub:

```bash
forge script script/UnlockVaultFromL1.s.sol:UnlockVaultFromL1 \
  --rpc-url anvil-zksync-l1 \
  --broadcast \
  --private-key $PRIVATE_KEY
```

It:

- Encodes the `unlock()` call to L2
- Estimates base cost using `l2TransactionBaseCost`
- Sends the message via `AccessKey.unlockVaultOnL2()` using Bridgehub
