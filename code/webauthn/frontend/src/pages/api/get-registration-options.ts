import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';

type Data = {
  options?: PublicKeyCredentialCreationOptionsJSON;
  error?: unknown;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { rpID, rpName, userName } = req.body;

    try {
      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName,
        attestationType: 'direct',
        excludeCredentials: [],
        authenticatorSelection: {
          residentKey: 'required',
          userVerification: 'required',
        },
      });

      res.status(200).json({ options });
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error });
    }
  } else {
    console.log('MUST USED GET METHOD');
    res.status(500);
  }
}
