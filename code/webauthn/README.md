# Sign Transactions With Webauthn Example

Note: this code is not secure. It is just intended as a proof of concept to demonstrate how signing transactions using secp256r1 signatures is possible.

This demo requires Google Chrome and a device that supports webauthn.

## Running Locally

### Install Dependencies

Run `npm install` in both the `frontend` and `contracts` folders.
Node version 20 is required.

### Start a local node

Run a local in-memory node with `era_test_node`:

```shell
era_test_node run
```

### Deploying a New Smart Account

Create a `.env` file and add a testing private key for deployment and a testing wallet to receive funds from the smart account.
The private key and receiver account in the example below are both listed in the rich wallets list: https://docs.zksync.io/build/test-and-debug/in-memory-node#pre-configured-rich-wallets

```env
WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110
RECEIVER_ACCOUNT=0xa61464658AfeAf65CccaaFD3a512b69A83B77618
```

Compile and deploy a new smart account using the `compile` and `transfer` scripts:

```shell
cd contracts
npm run compile
npm run transfer
```

From the logged output of the `transfer` script, copy the account address after "SC Account deployed on address" and save it to your `.env` file:

```env
ACCOUNT_ADDRESS=0x...
```

You'll come back to this later.

### Registering a Webauthn Key

Go to the frontend folder and start a development server:

```shell
npm run dev
```

Open the app at `http://localhost:3000` and click the 'Register Account' button to navigate to the `/register` page.
Enter a name for your passkey, and click the `Register New Passkey` button.

Note: it's important that you don't use another port. This step depends on the app running at port `3000`.

Once you see the message `Registered public key! Click me to copy.`, click it and add the private key to the `.env` in the `contracts` folder.

```env
NEW_R1_OWNER_PUBLIC_KEY=0x...
```

Your final `.env` file should look like this:

```env
WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110
RECEIVER_ACCOUNT=0xa61464658AfeAf65CccaaFD3a512b69A83B77618
ACCOUNT_ADDRESS=0x<YOUR_ACCOUNT_ADDRESS_HERE>
NEW_R1_OWNER_PUBLIC_KEY=0x<YOUR_PUB_KEY_HERE>
```

### Adding the Registered Key to Your Smart Contract Account

Back in the `contracts` folder, run the `register` script to register the public key as a signer.

```shell
npm run register
```

The output should say `R1 Owner updated successfully`.

### Sending a Txn with Webauthn

In the `frontend` folder inside `src/pages/transfer.tsx`, update the `ACCOUNT_ADDRESS` variable with your deployed account address
(same as the `ACCOUNT_ADDRESS` variable in the `contracts/.env` file).

Go back to the home page of the frontend app running at `http://localhost:3000/` and click the `Transfer Funds` link.
Enter any amount into the input and try transfering the ETH.

### Managing Registered Passkeys

You can delete and edit your registered keys in Google Chrome by going to `chrome://settings/passkeys`.
