import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const STAKING_CHAIN_1_CONTRACT_ADDRESS = '0x...';
const STAKING_CHAIN_2_CONTRACT_ADDRESS = '0x...';

// make sure chain ids match the chains you created in the ecosystem setup
const STAKING_CHAIN_1_ID = '34234';
const STAKING_CHAIN_2_ID = '5328';

export default buildModule('InteropTokenModule', (m) => {
  const approvedChainIds = [STAKING_CHAIN_1_ID, STAKING_CHAIN_2_ID];
  const approvedStakingContracts = [STAKING_CHAIN_1_CONTRACT_ADDRESS, STAKING_CHAIN_2_CONTRACT_ADDRESS];
  console.log('Approved staking contracts:', approvedStakingContracts);
  const counter = m.contract('InteropToken', [approvedChainIds, approvedStakingContracts]);

  return { counter };
});
