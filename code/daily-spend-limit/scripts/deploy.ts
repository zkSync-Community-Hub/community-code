import { ethers, deployer } from 'hardhat';
import { utils } from 'zksync-ethers';

async function main() {
  const deployedFactory = await deployFactory();
  const [wallet] = await ethers.getWallets();

  // // Bridge funds if the wallet on ZKsync doesn't have enough funds.
  // const depositAmount = ethers.parseEther('0.1');
  // const depositHandle = await wallet.deposit({
  //   to: signer.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: depositAmount,
  // });
  // await depositHandle.wait();

  const owner = ethers.Wallet.createRandom();
  const salt = ethers.ZeroHash;
  const tx = await deployedFactory.contract.deployAccount(salt, owner.address);
  await tx.wait();

  const abiCoder = new ethers.AbiCoder();
  const accountAddress = utils.create2Address(
    deployedFactory.address,
    await deployedFactory.contract.aaBytecodeHash(),
    salt,
    abiCoder.encode(['address'], [owner.address])
  );

  console.log(`SC Account owner pk: ${owner.privateKey}`);
  console.log(`SC Account deployed on address ${accountAddress}`);

  console.log('Funding smart contract account with some ETH');
  await (
    await wallet.sendTransaction({
      to: accountAddress,
      value: ethers.parseEther('0.02'),
    })
  ).wait();
  console.log(`Done!`);
}

async function deployFactory() {
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const aaArtifact = await deployer.loadArtifact('Account');

  const factory = await deployer.deploy(
    factoryArtifact,
    [utils.hashBytecode(aaArtifact.bytecode)],
    undefined,
    undefined,
    [aaArtifact.bytecode]
  );
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);
  return { contract: factory, address: factoryAddress };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
