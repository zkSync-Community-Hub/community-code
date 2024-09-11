/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from 'zksync-ethers';
import { getDataToSign, signAndSend } from '../../utils/sign';
import { getTransaction } from '../../utils/getTransaction';
import React from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles } from '.';
import { containerStyles } from './register';
import { ethers } from 'ethers';
import { authenticate } from '../../utils/webauthn';
import * as NFT_ABI_JSON from '../../../contracts/artifacts-zk/contracts/MyNFT.sol/MyNFT.json';

// Update this with your deployed smart contract account address and NFT contract address
const ACCOUNT_ADDRESS = '0x<YOUR_ACCOUNT_ADDRESS>';
const NFT_CONTRACT_ADDRESS = '0x<YOUR_NFT_CONTRACT_ADDRESS>';

export default function Mint() {
  const [mintedSVG, setMintedSVG] = React.useState<string | null>(null);
  const provider = new Provider('http://localhost:8011');

  async function mint(e: any) {
    e.preventDefault();
    try {
      const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI_JSON.abi, provider);
      const functionName = 'mintZeek';
      const functionArgs: any[] = [];
      const data = contract.interface.encodeFunctionData(functionName, functionArgs);
      const transferValue = '0';
      const tx = await getTransaction(NFT_CONTRACT_ADDRESS, ACCOUNT_ADDRESS, transferValue, data, provider);
      const signedTxHash = getDataToSign(tx);
      const authResponse = await authenticate(signedTxHash.toString());
      const receipt = await signAndSend(provider, tx, authResponse);
      console.log('RECEIPT:', receipt);
      const foundLog = receipt.logs.find((log: any) => {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog.name === 'NewNFTMinted') {
            return true;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          // ignore error
        }
        return false;
      });
      const dataFromLog = foundLog?.data;
      const parsedData = dataFromLog ? contract.interface.decodeEventLog('NewNFTMinted', dataFromLog) : null;
      const nftURI = await contract.tokenURI(parsedData?.tokenId);
      const prefix = 'data:application/json;base64,';
      const base64NFTData = nftURI.slice(prefix.length);
      const json = atob(base64NFTData);
      const svg = JSON.parse(json).image;
      setMintedSVG(svg);
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  return (
    <Layout>
      <div style={{ ...containerStyles, marginBottom: '2rem' }}>
        <button
          style={buttonStyles}
          onClick={mint}
        >
          Mint a Zeek NFT
        </button>
      </div>
      {mintedSVG && (
        <>
          <h3 style={{ textAlign: 'center' }}>🎉 You minted a ZEEK NFT! 🎉</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              maxWidth: '400px',
              maxHeight: '400px',
              margin: '2rem auto',
            }}
          >
            <img
              src={mintedSVG}
              alt="Minted NFT"
            />
          </div>
        </>
      )}
    </Layout>
  );
}
