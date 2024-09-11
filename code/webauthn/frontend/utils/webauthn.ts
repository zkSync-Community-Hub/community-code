import { startAuthentication } from '@simplewebauthn/browser';
import { bufferToHex, parseHex } from './string';
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
