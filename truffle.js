var HDWalletProvider = require("truffle-hdwallet-provider");
var deployInfuraConfig = require('./scripts/deploy-infura');

var infura_apikey = "eaX88vjNs1qzsrJlbMNC";
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 5000000,
      network_id: '*' // Match any network id
    }
    ,
    ropsten: {
      network_id: 3,
      provider: new HDWalletProvider(deployInfuraConfig.mnemonic, "https://ropsten.infura.io/"+deployInfuraConfig.infura_apikey),
      gas: 2000000
    }
  }
}
