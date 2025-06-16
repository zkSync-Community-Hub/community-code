import { getSignedMessage } from '../utils/message';
import { useState } from 'react';

export function SignMessageTS() {
  const [data, setData] = useState<string>();

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const element = event.target as HTMLFormElement;
          const formData = new FormData(element);
          const message = formData.get('message') as string;
          const signature = await getSignedMessage(message);
          setData(signature);
        }}
      >
        <input
          name="message"
          type="text"
          required
        />
        <button type="submit">Sign Message</button>
      </form>

      {data && <div>Signature: {data}</div>}
    </>
  );
}
