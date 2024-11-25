import { readContract } from '@wagmi/core';
import { config } from '../../wagmi-config';
import * as erc20TokenABI from '../../../frontend-paymaster/contracts/artifacts-zk/contracts/erc20/MyERC20Token.sol/MyERC20Token.json';

const CONTRACT_ADDRESS = '0x9c1a3d7C98dBF89c7f5d167F2219C29c2fe775A7';

export async function readERC20Contract(functionName: string) {
  const data = await readContract(config, {
    abi: erc20TokenABI.abi,
    address: CONTRACT_ADDRESS,
    functionName: functionName,
  });
  return data;
}
