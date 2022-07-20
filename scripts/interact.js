//import contract name and address
const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  //get contract
  const contract = await getContract(
    "AD NAME HERE", //contract name
    "ADD DEPLOYED CONTRACT ADDRESS HERE" //contract address
  );

  const amount = ethers.utils.parseEther("1");

  const recipient = owner.address;

  //interact
  const args = [recipient, amount];
  const tx = await contract.functions.mint(...args);
  const receipt = await tx.wait();
  console.log(receipt);

  console.log("erc20 balance: ", await contract.functions.balanceOf(recipient));
}

async function getContract(name, address) {
  const Contract = await ethers.getContractFactory(name);
  const contract = Contract.attach(address);
  return contract;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
