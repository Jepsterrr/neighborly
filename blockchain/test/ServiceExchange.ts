import { expect } from "chai";
import { network } from "hardhat";
const { ethers } = await network.connect();

describe("ServiceExchange", function () {
  // Vi definierar variabler som kommer användas i testerna
  let owner: any;
  let user1: any;
  let user2: any;
  let tokenContract: any;
  let reputationContract: any;
  let serviceExchange: any;

  // Denna funktion körs en gång innan alla tester
  beforeEach(async function () {
    // Hämta test-konton från Hardhat
    [owner, user1, user2] = await ethers.getSigners();

    // Deploya alla våra kontrakt
    const NeighborlyToken = await ethers.getContractFactory("NeighborlyToken");
    tokenContract = await NeighborlyToken.deploy(owner.address);

    const NeighborlyReputation = await ethers.getContractFactory("NeighborlyReputation");
    reputationContract = await NeighborlyReputation.deploy(owner.address);
    
    const ServiceExchange = await ethers.getContractFactory("ServiceExchange");
    serviceExchange = await ServiceExchange.deploy(tokenContract.target, reputationContract.target);

    // Ge ServiceExchange-kontraktet rätten att "minta" tokens och NFTs.
    await tokenContract.transferOwnership(serviceExchange.target);
    await reputationContract.transferOwnership(serviceExchange.target);
  });

  it("Should allow a user to create a service request", async function () {
    const rewardAmount = ethers.parseUnits("100", 18); // 100 tokens

    // Anropa funktionen createServiceRequest från user1's konto
    await serviceExchange.connect(user1).createServiceRequest("Hjälp att flytta en soffa", rewardAmount);

    // Hämta tjänsten vi just skapade (den har id 0)
    const service = await serviceExchange.services(0);

    // Verifiera att datan stämmer
    expect(service.id).to.equal(0);
    expect(service.requester).to.equal(user1.address);
    expect(service.reward).to.equal(rewardAmount);
    expect(service.status).to.equal(0); // 0 är Status.Open i vår enum
  });

});