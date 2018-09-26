var Migrations = artifacts.require("./Migrations.sol");
var Mambler = artifacts.require("./Mambler.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Mambler);
};
