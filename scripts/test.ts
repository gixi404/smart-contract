import { ethers } from "hardhat";

async function test() {
  try {
    const registry = await ethers.getContractFactory("IDogChain");
    const contract = registry.attach(process.env.CONTRACT_ADDRESS!);
    const perroTest = {
      hash: "huella-nasal-test-123",
      name: "Firulais",
      breed: "Labrador",
      age: 3,
      ownerContact: "test@email.com",
    };

    console.log("Registrando perro de prueba...");

    const tx = await contract.registerDog(
      ethers.keccak256(ethers.toUtf8Bytes(perroTest.hash)),
      perroTest.name,
      perroTest.breed,
      perroTest.age,
      perroTest.ownerContact
    );

    await tx.wait();
    console.log("¡Perro registrado exitosamente!");

    console.log("Buscando información del perro...");
    const dogInfo = await contract.getDog(
      ethers.keccak256(ethers.toUtf8Bytes(perroTest.hash))
    );

    console.log("\nInformación del perro:");
    console.log("Nombre:", dogInfo.dogName);
    console.log("Raza:", dogInfo.breed);
    console.log("Edad:", dogInfo.age.toString());
    console.log("Contacto del dueño:", dogInfo.ownerContact);
  } catch (error) {
    console.error("Error durante la prueba:", error);
  }
}

test()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
