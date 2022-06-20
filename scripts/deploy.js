const hre = require("hardhat");

async function main() {
  //signers
  const [owner] = await ethers.getSigners();

  //deploy contract
  const contract = await deploy(
    "CloneFactory", //contract name
    [] //list of deploy args
  );

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

async function deploy(name, args) {
  const Contract = await hre.ethers.getContractFactory(name);
  const contract = await Contract.deploy(...args);
  return contract;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
