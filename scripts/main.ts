import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";

async function main(): Promise<void> {
  try {
    const [deployer, account1, account2] = await ethers.getSigners();

    console.log("📝 Usando las siguientes cuentas:");
    console.log("Deployer:", deployer.address);
    console.log("Cuenta 1:", account1.address);
    console.log("Cuenta 2:", account2.address);

    console.log("\n🚀 Desplegando contrato...");
    const DogNoseRegistry = await ethers.getContractFactory("DogNoseRegistry");
    const registry = await DogNoseRegistry.deploy();
    await registry.waitForDeployment();

    const CONTRACT_ADDRESS: string = await registry.getAddress();
    console.log("✅ Contrato desplegado en:", CONTRACT_ADDRESS);

    console.log("\n🐕 Registrando perro con cuenta 1...");
    const noseHash1 = ethers.keccak256(ethers.toUtf8Bytes("max_" + Date.now()));
    let ctr: ContractTransactionResponse = await registry
      .connect(account1)
      .registerDog(noseHash1, "Max", "Labrador", 3, "123456789");
    await ctr.wait();
    console.log("✅ Perro registrado por:", account1.address);

    console.log("\n🐕 Registrando perro con cuenta 2...");
    const noseHash2 = ethers.keccak256(
      ethers.toUtf8Bytes("luna_" + Date.now())
    );
    ctr = await registry
      .connect(account2)
      .registerDog(noseHash2, "Luna", "Pastor Alemán", 2, "987654321");
    await ctr.wait();
    console.log("✅ Perro registrado por:", account2.address);

    console.log("\n📖 Consultando perros registrados:");
    const dog1 = await registry.getDog(noseHash1);
    const dog2 = await registry.getDog(noseHash2);

    console.log("\nPerro 1:", {
      nombre: dog1.name,
      dueño: dog1.owner,
      raza: dog1.breed,
      edad: dog1.age.toString(),
      contacto: dog1.ownerContact,
    });

    console.log("\nPerro 2:", {
      nombre: dog2.name,
      dueño: dog2.owner,
      raza: dog2.breed,
      edad: dog2.age.toString(),
      contacto: dog2.ownerContact,
    });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
