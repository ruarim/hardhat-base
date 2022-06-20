async function main() {
  //get contract
  const contract = await getContract(
    "CloneFactory", //contract name
    "0x29f7A6792a82C4B604450319FcfE8Feb9FAe4575" //contract address
  );
  
  //interact
  const args = [];
  const tx = await contract.functions.createClone();
  const receipt = await tx.wait();

  console.log(receipt.events[0]?.args.newClone);
  
  const newClone = await contract.functions.getLatestClone();
  console.log(newClone);
}

async function getContract(name, address) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.attach(address);
  return contract;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
