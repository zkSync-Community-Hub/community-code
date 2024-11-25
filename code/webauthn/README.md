# Sign Transactions With Webauthn Example

This demo requires Google Chrome and a device that supports webauthn.

## Running Locally

### Install Dependencies

Use node version `20.16.0`.
Run `npm install` in both the `frontend` and `contracts` folders.

### Start a local node

Run a local in-memory node with `era_test_node`:

```shell
era_test_node run
```

### Deploying the Contracts

Make a `.env` file and add a private key for a [pre-configured rich wallet](https://docs.zksync.io/build/test-and-debug/in-memory-node#pre-configured-rich-wallets).

```env
WALLET_PRIVATE_KEY=<0x_YOUR_PRIVATE_KEY>
```

Deploy the AAFactory, paymaster, and NFT contracts:

```shell
npm run deploy
```

Once deployed, create a `frontend/.env.local` file based example in `frontend/.env.example` and add the deployed addresses.

```env
NEXT_PUBLIC_AA_FACTORY_ADDRESS=<0x_YOUR_AA_CONTRACT_ADDRESS>
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=<0x_YOUR_NFT_CONTRACT_ADDRESS>
NEXT_PUBLIC_PAYMASTER_ADDRESS=<0x_YOUR_PAYMASTER_CONTRACT_ADDRESS>
```

### Deploying a New Smart Account

Go to the frontend folder and start a development server:

```shell
npm run dev
```

> Note: The next steps depend on the app running at port `3000`.

Open the app at `http://localhost:3000` and click the 'Create Account' button to navigate to the `/create-account` page.
Click the button to create a new account.
You can optionally save the private key logged.

### Registering a Webauthn Key

Go back to the home page and click the "Register Passkey" button

### Siging Transactions with Webauthn

Go back to the home page and click the `Transfer Funds` link.
Enter any amount into the input and try transfering the ETH.

You can also click the `Mint NFT` button on the home page to try minting an NFT.

### Managing Registered Passkeys

You can delete and edit your registered keys in Google Chrome by going to `chrome://settings/passkeys`.
