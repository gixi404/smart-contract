import { expect } from "chai";
import { ethers } from "hardhat";
// import { IDogChain } from "../typechain-types";

describe("IDogChain", function () {
  let dogRegistry: any; //IDogChain
  let owner: any;

  beforeEach(async function () {
    // Desplegar el contrato antes de cada test
    const IDogChain = await ethers.getContractFactory("IDogChain");
    dogRegistry = await IDogChain.deploy();
    [owner] = await ethers.getSigners();
  });

  it("Debería registrar un perro nuevo", async function () {
    const noseHash = ethers.keccak256(ethers.toUtf8Bytes("huella_test"));
    await dogRegistry.registerDog(
      noseHash,
      "Max",
      "Labrador",
      3,
      "test@email.com"
    );

    const dogInfo = await dogRegistry.getDog(noseHash);
    expect(dogInfo.name).to.equal("Max");
    expect(dogInfo.breed).to.equal("Labrador");
    expect(dogInfo.age).to.equal(3);
  });

  it("No debería permitir registrar el mismo perro dos veces", async function () {
    const noseHash = ethers.keccak256(ethers.toUtf8Bytes("huella_test"));
    await dogRegistry.registerDog(
      noseHash,
      "Max",
      "Labrador",
      3,
      "test@email.com"
    );

    await expect(
      dogRegistry.registerDog(noseHash, "Max", "Labrador", 3, "test@email.com")
    ).to.be.revertedWith("Este perro ya esta registrado");
  });
});
