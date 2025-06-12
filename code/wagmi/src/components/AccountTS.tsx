import { fetchAccount } from '../utils/account';

export function AccountTS() {
  const address = fetchAccount();

  return <div>{address}</div>;
}
