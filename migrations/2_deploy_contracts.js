var Users = artifacts.require("./Users.sol");
var EsensVote = artifacts.require("./EsensVote.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(EsensVote);
};
