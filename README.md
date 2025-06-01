# 🐕 IDogChain

## ⚙️ Configuración

1. **Clonar e instalar**
```bash
git clone <url-repositorio>
cd smart-contract
npm install
```

2. **Configurar .env**
```properties
ALCHEMY_URL=https://eth-sepolia.g.alchemy.com/v2/tu-api-key
PRIVATE_KEY=tu-clave-privada-sin-0x
CONTRACT_ADDRESS=dirección-del-contrato
```

## 🚀 Despliegue

1. **Obtener ETH de prueba**
- Ve a [Sepolia Faucet](https://sepoliafaucet.com/)
- Conecta tu wallet
- Solicita ETH de prueba

2. **Desplegar contrato**
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```


### Registro de Perro
```typescript
type DogAction = {
  action: "new-dog";
  hash: string;
  dogData: {
    name: string;
    breed: string;
    age: number;
    ownerContact: string;
  };
};

await handleDogAction({
  action: "new-dog",
  hash: "huella-nasal-única",
  dogData: {
    name: "Firulais",
    breed: "Labrador",
    age: 3,
    ownerContact: "dueño@email.com"
  }
});
```

### Búsqueda de Perro
```typescript
type DogAction = {
  action: "find-dog";
  hash: string;
};

await handleDogAction({
  action: "find-dog",
  hash: "huella-nasal-única"
});
```

## 🧪 Pruebas

**Ejecutar pruebas**
```bash
# Pruebas locales
npx hardhat test

# Pruebas en Sepolia
npx hardhat run scripts/test.ts --network sepolia
```

## 🔍 Verificación de Transacciones
- Usa [Sepolia Etherscan](https://sepolia.etherscan.io/)
- Ingresa la dirección del contrato
- Revisa el historial de transacciones

## 📝 Licencia
MIT
