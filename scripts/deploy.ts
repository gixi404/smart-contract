import { ethers } from "hardhat";
import { JsonRpcProvider } from "ethers";

async function deploy() {
  try {
    const provider = new JsonRpcProvider(process.env.ALCHEMY_URL),
      wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider),
      DogChain = await ethers.getContractFactory("IDogChain", wallet),
      dogChain = await DogChain.deploy();

    await dogChain.waitForDeployment();

    const contractAddress = await dogChain.getAddress();
    console.log("Dirección del contrato:", contractAddress);
  } catch (error) {
    console.error("Error al desplegar:", error);
    process.exit(1);
  }
}

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
