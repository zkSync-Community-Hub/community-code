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
