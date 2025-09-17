import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  console.log("Deploying contracts...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1. Deploy NeighborlyToken
  const tokenContract = await ethers.deployContract("NeighborlyToken", [deployer.address]);
  await tokenContract.waitForDeployment();
  console.log(`NeighborlyToken deployed to: ${tokenContract.target}`);

  // 2. Deploy NeighborlyReputation
  const reputationContract = await ethers.deployContract("NeighborlyReputation", [deployer.address]);
  await reputationContract.waitForDeployment();
  console.log(`NeighborlyReputation deployed to: ${reputationContract.target}`);
  
  // 3. Deploy ServiceExchange
  const serviceExchange = await ethers.deployContract("ServiceExchange", [tokenContract.target, reputationContract.target]);
  await serviceExchange.waitForDeployment();
  console.log(`ServiceExchange deployed to: ${serviceExchange.target}`);

  // 4. Transfer ownership to ServiceExchange contract
  console.log("Transferring ownership to ServiceExchange...");
  const tokenTx = await tokenContract.transferOwnership(serviceExchange.target);
  await tokenTx.wait();
  console.log("NeighborlyToken ownership transferred.");
  
  const reputationTx = await reputationContract.transferOwnership(serviceExchange.target);
  await reputationTx.wait();
  console.log("NeighborlyReputation ownership transferred.");

  console.log("Deployment and setup complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});