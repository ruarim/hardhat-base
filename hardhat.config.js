require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-vyper");

const { PRIVATE_KEY, POLYGONSCAN_API_KEY, REPORT_GAS } = process.env;

const accounts = [`${PRIVATE_KEY}`];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-rpc.com",
      },
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts,
    },
    mumbai: {
      url: "https://polygon-testnet.public.blastapi.io",
      accounts,
    },
    fuji: {
      url: "https://rpc.ankr.com/avalanche_fuji",
      accounts,
    },
  },
  etherscan: {
    apiKey: `${POLYGONSCAN_API_KEY}`,
  },
  gasReporter: {
    enabled: REPORT_GAS ? true : false,
  },
};
