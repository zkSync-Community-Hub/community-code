import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('StakingModule', (m) => {
  const counter = m.contract('Staking');

  return { counter };
});
