import { startAuthentication } from '@simplewebauthn/browser';
import { bufferToHex, parseHex, arrayBufferToHex, bufferFromBase64url } from './string';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { EIP712Signer, type Provider, utils } from 'zksync-ethers';
import type { AuthenticatorAssertionResponseJSON } from '@simplewebauthn/types';
import { BigNumber } from 'ethers';
import type { TransactionRequest } from 'zksync-ethers/src/types';
import * as cbor from 'cbor';

export async function authenticate(challenge: string) {
  const resp = await fetch('http://localhost:3000/api/generate-authentication-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ challenge }),
  });
  const data = await resp.json();
  const options = data.options;
  const authResp = await startAuthentication(options);
  return authResp.response;
}

export async function signAndSend(
  provider: Provider,
  transaction: TransactionRequest,
  authenticationResponse: AuthenticatorAssertionResponseJSON
) {
  const signature = await getSignatureFromAuthResponse(authenticationResponse);
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
  const sentTx = await provider.sendTransaction(utils.serialize(transaction));
  const txReceipt = await sentTx.wait();
  return txReceipt;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSignatureFromAuthResponse(response: any) {
  const authenticatorDataBuffer = bufferFromBase64url(response.authenticatorData);
  const clientDataBuffer = bufferFromBase64url(response.clientDataJSON);
  const rs = getRS(response.signature);
  const signature = defaultAbiCoder.encode(
    ['bytes', 'bytes', 'bytes32[2]'],
    [authenticatorDataBuffer, clientDataBuffer, rs]
  );
  return signature;
}

export function getDataToSign(transaction: TransactionRequest) {
  const signedTxHash = EIP712Signer.getSignedDigest(transaction);
  return signedTxHash;
}

export function getRS(signatureBase64Url: string): Array<BigNumber> {
  const n = BigNumber.from('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
  const halfN = n.div(2);
  const signatureBuffer = bufferFromBase64url(signatureBase64Url);
  const signatureParsed = derToRS(signatureBuffer);
  const firstHex = arrayBufferToHex(signatureParsed[0]);
  const first = BigNumber.from('0x' + firstHex);
  const second = BigNumber.from('0x' + arrayBufferToHex(signatureParsed[1]));
  const sig: Array<BigNumber> = [first, second];

  if (sig[1].gt(halfN)) {
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
  const r = der.subarray(dataOffset, dataOffset + 32);
  offset = offset + der[offset] + 1 + 1;
  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const s = der.subarray(dataOffset, dataOffset + 32);
  return [r, s];
}

export function getPublicKeyFromAuthenticatorData(authData: string): string {
  const authDataBuffer = Buffer.from(authData, 'base64');
  const credentialData = authDataBuffer.subarray(32 + 1 + 4 + 16, authDataBuffer.length); // RP ID Hash + Flags + Counter + AAGUID
  const lbase = credentialData.subarray(0, 2).toString('hex');
  const l = parseInt(lbase, 16);
  const credentialPubKey = credentialData.subarray(2 + l, credentialData.length); // sizeof(L) + L
  return getPublicKeyFromCredentialPublicKey(credentialPubKey);
}

function getPublicKeyFromCredentialPublicKey(credentialPublicKey: Uint8Array): string {
  const publicKey: Map<-2 | -3 | -1 | 1 | 3, Buffer | number> = cbor.decode(credentialPublicKey);

  const x = bufferToHex(publicKey.get(-2) as Buffer);
  const y = bufferToHex(publicKey.get(-3) as Buffer);

  return x.concat(parseHex(y));
}
