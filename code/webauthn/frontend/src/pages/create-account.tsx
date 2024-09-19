import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles, BUTTON_COLORS } from './index';
import { containerStyles, headerStyles } from './register';
import { type Provider, utils, Wallet } from 'zksync-ethers';
import { ethers } from 'ethers';
import factoryAbiJSON from '../../../contracts/artifacts-zk/contracts/AAFactory.sol/AAFactory.json';
import { getPaymasterOverrides } from '../../utils/tx';
import { useAccount, useSetAccount } from '@/hooks/useAccount';
import {
  useSetWallet,
  // useWallet
} from '@/hooks/useWallet';

const AA_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_AA_FACTORY_ADDRESS || '';

export default function CreateAccount({ provider }: { provider: Provider }) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const account = useAccount();
  const setAccount = useSetAccount();
  const setWallet = useSetWallet();
  // const accountWallet = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function sendTestFunds(to: string) {
    const richWallet = new Wallet('0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110', provider);
    const tx = {
      to,
      value: ethers.utils.parseEther('100'),
    };
    const txResponse = await richWallet.sendTransaction(tx);
    await txResponse.wait();
  }

  async function deployNewAccount() {
    const owner = Wallet.createRandom().connect(provider);
    const aaFactory = new ethers.Contract(AA_FACTORY_ADDRESS, factoryAbiJSON.abi, owner);
    const salt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const overrides = await getPaymasterOverrides();
    const tx = await aaFactory.deployAccount(salt, owner.address, overrides);
    await tx.wait();

    const abiCoder = new ethers.utils.AbiCoder();
    const accountAddress = utils.create2Address(
      AA_FACTORY_ADDRESS,
      await aaFactory.aaBytecodeHash(),
      salt,
      abiCoder.encode(['address'], [owner.address])
    );

    return { accountAddress, owner };
  }

  async function createAccount() {
    try {
      const { accountAddress, owner } = await deployNewAccount();
      if (provider.connection.url.includes('localhost')) {
        await sendTestFunds(accountAddress);
      }
      setWallet(owner);
      setAccount(accountAddress);
    } catch (error) {
      console.log('ERROR:', error);
      alert('Error creating account');
    }
  }

  return (
    <Layout>
      <h1 style={headerStyles}>Create an Account</h1>
      <div style={{ ...containerStyles, marginBottom: '2rem' }}>
        <button
          style={{ ...buttonStyles, background: BUTTON_COLORS[0] }}
          onClick={createAccount}
        >
          Create a New Account
        </button>
      </div>
      {account && isMounted && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <div>Your current account is:</div>
          <div>{account}</div>
        </div>
      )}
      {/* {accountWallet && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <div>Your current account private key is:</div>
          <div>{accountWallet?.privateKey}</div>
        </div>
      )} */}
    </Layout>
  );
}
