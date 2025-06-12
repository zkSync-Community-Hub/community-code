/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as hre from 'hardhat';
import { expect } from 'chai';
import { Wallet, type Contract } from 'zksync-ethers';
import { Deployer } from '@matterlabs/hardhat-zksync';
import type { ZkSyncArtifact } from '@matterlabs/hardhat-zksync-deploy/src/types';

const RICH_PRIVATE_KEY = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110';

describe('Greeter', function () {
  let deployer: Deployer;
  let artifact: ZkSyncArtifact;
  let contract: Contract;

  before(async function () {
    // To ensure proper testing, we need to deploy our contract on the Anvil ZKsync node, for more info check hardhat-zksync-deploy plugin documentation.
    deployer = new Deployer(hre, new Wallet(RICH_PRIVATE_KEY));
    artifact = await deployer.loadArtifact('Greeter');
    contract = await deployer.deploy(artifact, ['Hello, world!']);
  });
  it('greet should return a string', async function () {
    expect(await contract.greet()).to.be.a('string');
  });
  it('is deployed address valid', async function () {
    expect(await contract.getAddress()).to.be.properAddress;
  });
  it('greet should say Hello', async function () {
    expect(await contract.greet()).to.match(/^Hello/);
  });
  it('setGreeting should throw when passed an invalid argument', async function () {
    await expect(contract.setGreeting('')).to.be.reverted;
  });
  it('isGreetingChanged should return true after setting greeting', async function () {
    expect(await contract.isGreetingChanged()).to.be.false;
    const tx = await contract.setGreeting('Changed');
    await tx.wait();
    expect(await contract.greet()).to.match(/^Changed/);
    expect(await contract.isGreetingChanged()).to.be.true;
  });
});
