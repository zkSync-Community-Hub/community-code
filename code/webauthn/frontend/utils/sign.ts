import { defaultAbiCoder } from 'ethers/lib/utils';
import { bufferFromBase64url, hexToBase64Url, parseHex } from './string';
import { EIP712Signer, type Provider, utils } from 'zksync-ethers';
import type { AuthenticatorAssertionResponseJSON } from '@simplewebauthn/types';
import { BigNumber } from 'ethers';
import { bufferToHex } from '@passwordless-id/webauthn/dist/esm/utils';
import type { TransactionRequest } from 'zksync-ethers/build/types';

const n = BigNumber.from('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
const halfN = n.div(2);

export async function signAndSend(
  provider: Provider,
  transaction: TransactionRequest,
  authenticationResponse: AuthenticatorAssertionResponseJSON
) {
  const signature = await getSignatureFromAuthResponse(authenticationResponse);
  console.log('FINAL SIGNATURE:', signature);
  const newTx = {
    ...transaction,
    customData: {
      ...transaction.customData,
      customSignature: signature,
    },
  };
  return await send(newTx, provider);
}

export async function send(transaction: TransactionRequest, provider: Provider) {
  console.log('Sending transaction', transaction);
  const sentTx = await provider.sendTransaction(utils.serialize(transaction));
  console.log('sentTx', sentTx);
  const txReceipt = await sentTx.wait();
  return txReceipt;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSignatureFromAuthResponse(response: any) {
  const authenticatorDataBuffer = bufferFromBase64url(response.authenticatorData);
  const clientDataBuffer = bufferFromBase64url(response.clientDataJSON);
  const rs = getRS(response.signature);

  return defaultAbiCoder.encode(['bytes', 'bytes', 'bytes32[2]'], [authenticatorDataBuffer, clientDataBuffer, rs]);
}

export function getDataToSign(transaction: TransactionRequest) {
  const signedTxHash = EIP712Signer.getSignedDigest(transaction);
  const message = parseHex(signedTxHash.toString());
  const data = hexToBase64Url(message);
  return data;
}

export function getRS(signatureBase64Url: string): Array<BigNumber> {
  const signatureBuffer = bufferFromBase64url(signatureBase64Url);
  const signatureParsed = derToRS(signatureBuffer);
  console.log('signatureParsed:', signatureParsed);
  const firstHex = bufferToHex(signatureParsed[0]);
  console.log('first hex:', firstHex);

  const first = BigNumber.from('0x' + firstHex);
  console.log('first:', first);

  const second = BigNumber.from('0x' + bufferToHex(signatureParsed[1]));
  console.log('second:', second);

  const sig: Array<BigNumber> = [first, second];
  console.log('sig:', sig);

  if (sig[1].gt(halfN)) {
    console.log('is greater than halfN');
    sig[1] = n.sub(sig[1]);
  }

  return sig;
}

function derToRS(der: Buffer): Array<Buffer> {
  let offset = 3;
  let dataOffset: number;

  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  // TODO: fix deprecated subarray
  const r = der.slice(dataOffset, dataOffset + 32);
  offset = offset + der[offset] + 1 + 1;
  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const s = der.subarray(dataOffset, dataOffset + 32);
  return [r, s];
}
