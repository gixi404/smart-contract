import {
  type BaseContract,
  type ContractTransactionResponse,
  ethers as e,
} from "ethers";

interface DogInfo {
  dogName: string;
  owner: string;
  breed: string;
  age: e.BigNumberish;
  ownerContact: string;
  registrationDate: e.BigNumberish;
  lastUpdated: e.BigNumberish;
}

interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

interface IDogChain extends BaseContract {
  registerDog(
    noseHash: string,
    name: string,
    breed: string,
    age: number,
    ownerContact: string
  ): Promise<ContractTransactionResponse>;

  getDog(noseHash: string): Promise<DogInfo>;

  updateDog(
    noseHash: string,
    name: string,
    breed: string,
    age: number,
    ownerContact: string
  ): Promise<ContractTransactionResponse>;

  removeDog(noseHash: string): Promise<ContractTransactionResponse>;

  getOwnerDogs(): Promise<string[]>;
}

interface DogData {
  noseHash: string;
  nombre: string;
  raza: string;
  edad: string;
  contacto: string;
  fechaRegistro: string;
  ultimaActualizacion: string;
}

interface OwnerDogsResponse extends ActionResponse {
  data?: {
    totalPerros: number;
    perros: DogData[];
  };
}

type ActionType = "new-dog" | "update-dog" | "find-dog" | "remove-dog";

interface DogAction {
  action: ActionType;
  hash: string;
  dogData?: {
    name?: string;
    breed?: string;
    age?: number;
    ownerContact?: string;
  };
}

export {
  DogInfo,
  ActionResponse,
  IDogChain,
  DogData,
  OwnerDogsResponse,
  ActionType,
  DogAction,
};
