import hre  from "hardhat";

async function main() {
  const GiveMeMoney = await hre.ethers.getContractFactory("GiveMeMoney");
  const giveMeMoney = await GiveMeMoney.deploy();
  await giveMeMoney.getDeployedCode();
  console.log("GiveMeMoney deployed to ", giveMeMoney.getAddress);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
