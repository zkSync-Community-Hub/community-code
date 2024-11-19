import { getSignedTypedData } from '@/utils/signTyped';
import { useState } from 'react';

export function SignTypedDataTS() {
  const [signature, setSignature] = useState<string>();

  return (
    <>
      <button
        onClick={async () => {
          const sig = await getSignedTypedData({
            types: {
              Person: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
              ],
              Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person' },
                { name: 'contents', type: 'string' },
              ],
            },
            primaryType: 'Mail',
            message: {
              from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              },
              to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              },
              contents: 'Hello, Bob!',
            },
          });
          setSignature(sig);
        }}
      >
        Sign message
      </button>
      <div>{signature && <p>Signature: {signature}</p>}</div>
    </>
  );
}
