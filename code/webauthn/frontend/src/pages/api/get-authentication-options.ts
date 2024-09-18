import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/types';

type Data = {
  options?: PublicKeyCredentialRequestOptionsJSON;
  error?: unknown;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const rpID = 'localhost';
    const { challenge } = req.body;

    try {
      const options = await generateAuthenticationOptions({
        challenge,
        rpID,
        userVerification: 'required',
        allowCredentials: [],
      });

      res.status(200).json({ options });
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error });
    }
  } else {
    console.log('MUST USE POST METHOD');
    res.status(500);
  }
}
