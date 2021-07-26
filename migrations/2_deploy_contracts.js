const FundingCreator = artifacts.require("FundingCreator");


module.exports = async (deployer) => {
  try {
    await deployer.deploy(FundingCreator);
  } catch (err) {
    console.error(err);
  }
};