import { startAuthentication } from '@simplewebauthn/browser';

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
