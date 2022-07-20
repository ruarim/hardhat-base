const hre = require("hardhat");

async function main() {
  //signers
  const [owner] = await ethers.getSigners();
  const amount = ethers.utils.parseEther("1");

  //deploy contract
  const contract = await deploy(
    "GLDToken", //contract name
    [amount] //list of deploy args
  );

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  
  console.log(
    "erc20 balance: ",
    await contract.functions.balanceOf(owner.address)
  );
  
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
