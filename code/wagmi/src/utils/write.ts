import { readContract } from '@wagmi/core';
import { config } from '../../wagmi-config';
import * as greeterABI from '../../../frontend-paymaster/contracts/artifacts-zk/contracts/Greeter.sol/Greeter.json';

const CONTRACT_ADDRESS = '0xCeAB1fc2693930bbad33024D270598c620D7A52B';

export async function writeToGreeterContract(greeting: string) {
  const data = await readContract(config, {
    abi: greeterABI.abi,
    address: CONTRACT_ADDRESS,
    functionName: 'setGreeting',
    args: [greeting],
  });
  return data;
}
