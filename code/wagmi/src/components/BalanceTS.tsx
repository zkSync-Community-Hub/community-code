import { fetchBalance } from '@/utils/balance';
import { useState } from 'react';

export function BalanceTS() {
  const [balance, setBalance] = useState<bigint>();

  const updateBalance = async () => {
    const newBalance = await fetchBalance();
    setBalance(newBalance);
  };

  return (
    <div>
      <button onClick={updateBalance}>Update Balance</button>
      {balance && <p>Balance: {balance.toString()}</p>}
    </div>
  );
}
