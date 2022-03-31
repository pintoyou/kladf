require("@nomiclabs/hardhat-waffle");
let secret = require("./secret")


task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {

  networks: {  
    testnet: {
    url: secret.url,
    accounts: [secret.key]
  }
  /*
  mumbai: {
    // Infura
    // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
    url: "https://rpc-mumbai.matic.today",
    accounts: [process.env.privateKey]
  },
  matic: {
    // Infura
    // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
    url: "https://rpc-mainnet.maticvigil.com",
    accounts: [process.env.privateKey]
  }
  */
},


  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
