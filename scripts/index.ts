import { ethers } from "hardhat";
import type {
  ContractFactory as CF,
  ContractTransactionResponse as CTR,
} from "ethers";
import type {
  ActionResponse,
  IDogChain,
  OwnerDogsResponse,
  DogAction,
  DogInfo,
} from "../utils/types";

async function handleDogAction(action: DogAction): Promise<ActionResponse> {
  try {
    const registry: CF = await ethers.getContractFactory("IDogChain"),
      CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string,
      contract = registry.attach(CONTRACT_ADDRESS) as IDogChain,
      noseHash: string = ethers.keccak256(ethers.toUtf8Bytes(action.hash));

    switch (action.action) {
      case "new-dog":
        if (!action.dogData) throw new Error("Se requieren datos del perro");
        const tx: CTR = await contract.registerDog(
          noseHash,
          action.dogData.name || "",
          action.dogData.breed || "",
          action.dogData.age || 0,
          action.dogData.ownerContact || ""
        );
        await tx.wait();
        return {
          success: true,
          message: "Perro registrado exitosamente",
          data: { noseHash },
        };

      case "find-dog":
        const dogInfo: DogInfo = await contract.getDog(noseHash);
        return {
          success: true,
          data: {
            nombre: dogInfo.dogName,
            dueño: dogInfo.owner,
            raza: dogInfo.breed,
            edad: dogInfo.age.toString(),
            contacto: dogInfo.ownerContact,
            fechaRegistro: new Date(
              Number(dogInfo.registrationDate) * 1000
            ).toLocaleString(),
            ultimaActualizacion: new Date(
              Number(dogInfo.lastUpdated) * 1000
            ).toLocaleString(),
          },
        };

      case "update-dog":
        if (!action.dogData) throw new Error("Se requieren datos del perro");
        const updateTx: CTR = await contract.updateDog(
          noseHash,
          action.dogData.name || "",
          action.dogData.breed || "",
          action.dogData.age || 0,
          action.dogData.ownerContact || ""
        );
        await updateTx.wait();
        return {
          success: true,
          message: "Perro actualizado exitosamente",
          data: { noseHash },
        };

      case "remove-dog":
        const removeTx: CTR = await contract.removeDog(noseHash);
        await removeTx.wait();
        return {
          success: true,
          message: "Perro eliminado exitosamente",
          data: { noseHash },
        };

      default:
        return { success: false, message: "Acción no válida" };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error,
    };
  }
}

async function getOwnerDogs(): Promise<OwnerDogsResponse> {
  try {
    const registry = await ethers.getContractFactory("IDogChain");
    const CONTRACT_ADDRESS = "TU_DIRECCIÓN_DEL_CONTRATO_DESPLEGADO";
    const contract = registry.attach(CONTRACT_ADDRESS) as IDogChain;

    const dogsHashes = await contract.getOwnerDogs();
    const dogs = [];

    for (const hash of dogsHashes) {
      const dogInfo = await contract.getDog(hash);
      dogs.push({
        noseHash: hash,
        nombre: dogInfo.dogName,
        raza: dogInfo.breed,
        edad: dogInfo.age.toString(),
        contacto: dogInfo.ownerContact,
        fechaRegistro: new Date(
          Number(dogInfo.registrationDate) * 1000
        ).toLocaleString(),
        ultimaActualizacion: new Date(
          Number(dogInfo.lastUpdated) * 1000
        ).toLocaleString(),
      });
    }

    return {
      success: true,
      data: {
        totalPerros: dogs.length,
        perros: dogs,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error,
    };
  }
}

export { handleDogAction, getOwnerDogs };
