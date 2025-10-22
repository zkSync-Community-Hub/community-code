import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const ABSTRACT_CONTRACT_ADDRESS = '0x';
// make sure chain ids match the chains you chose
const ABSTRACT_CHAIN_ID = '11124';
const LENS_CHAIN_ID = '37111';
const SOPHON_CHAIN_ID = '531050104';

export default buildModule('InteropTokenModule', (m) => {
  const approvedChainIds = [ABSTRACT_CHAIN_ID, SOPHON_CONTRACT_ADDRESS];
  const approvedStakingContracts = [ABSTRACT_CONTRACT_ADDRESS, SOPHON_CHAIN_ID];
  console.log('Approved staking contracts:', approvedStakingContracts);
  const counter = m.contract('InteropToken', [approvedChainIds, approvedStakingContracts]);

  return { counter };
});
