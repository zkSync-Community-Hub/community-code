import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const STAKING_CHAIN_1_CONTRACT_ADDRESS = '0x7A03C544695751Fe78FC75C6C1397e4601579B1f';
const STAKING_CHAIN_2_CONTRACT_ADDRESS = '0xD75Bf167785EAe2197ef92637337259bfD16bDE9';

const STAKING_CHAIN_1_ID = '34234';
const STAKING_CHAIN_2_ID = '5321';

export default buildModule('InteropTokenModule', (m) => {
  const approvedChainIds = [STAKING_CHAIN_1_ID, STAKING_CHAIN_2_ID];
  const approvedStakingContracts = [STAKING_CHAIN_1_CONTRACT_ADDRESS, STAKING_CHAIN_2_CONTRACT_ADDRESS];
  console.log('Approved staking contracts:', approvedStakingContracts);
  const counter = m.contract('InteropToken', [approvedChainIds, approvedStakingContracts]);

  return { counter };
});
