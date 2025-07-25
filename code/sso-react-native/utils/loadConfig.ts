import type { Config } from 'react-native-zksync-sso';

export const loadConfig = (): Config => {
  const config: Config = {
    // ZKsync Era Sepolia testnet contracts
    contracts: {
      session: '0x64Fa4b6fCF655024e6d540E0dFcA4142107D4fBC',
      passkey: '0x006ecc2D79242F1986b7cb5F636d6E3f499f1026',
      accountFactory: '0xd122999B15081d90b175C81B8a4a9bE3327C0c2a',
      accountPaymaster: '0x4Cb1C15710366b73f3D31EC2b3092d5f3BFD8504',
      recovery: '0x6AA83E35439D71F28273Df396BC7768dbaA9849D',
    },
    nodeUrl: 'https://sepolia.era.zksync.dev',
    deployWallet: {
      // replace with a valid private key for deploying accounts
      // do not include the `0x` prefix
      // ensure the account has enough funds to deploy accounts
      // do not publicly commit this file with a real private key
      privateKeyHex: '<YOUR_PRIVATE_KEY>',
    },
  };

  return config;
};
