// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy MultiToken contract with initial URI
  const MultiToken = await hre.ethers.getContractFactory("MultiToken");
  const multiToken = await MultiToken.deploy("https://placeholder-uri.io/metadata/{id}.json");

  await multiToken.deployed();
  console.log("MultiToken deployed to:", multiToken.address);

  // Optional: log network info
  console.log("Network:", hre.network.name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
