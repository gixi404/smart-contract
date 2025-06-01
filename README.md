# Dog Nose Registry - Smart Contract
Smart contract para registrar perros usando su huella nasal como identificador único.

## Configuración Local

1. Inicia el nodo local de Hardhat en una terminal:
```bash
npx hardhat node
```
Este comando iniciará una blockchain local con 20 cuentas de prueba, cada una con 1.000 ETH.

2. En otra terminal, ejecuta el script de prueba:
```bash
npx hardhat run scripts/index.ts --network localhost
```

## Estructura del Proyecto

```
smart-contract/
├── contracts/
│   └── IDogChain.sol    # Contrato principal
├── scripts/
│   └── index.ts                # Script de despliegue y prueba
└── test/
    └── IDogChain.test.ts # Tests unitarios
```

## Funcionalidades

- Registrar perros con su huella nasal
- Consultar información de perros registrados
- Asociar perros con sus dueños
- Actualizar información de perros

## Uso del Contrato

1. **Registrar un perro**:
```typescript
await registry.registerDog(
    noseHash,      // Hash de la huella nasal
    "Max",         // Nombre del perro
    "Labrador",    // Raza
    3,             // Edad
    "123456789"    // Contacto del dueño
);
```

2. **Consultar un perro**:
```typescript
const dogInfo = await registry.getDog(noseHash);
```

## Tests

Para ejecutar los tests:
```bash
npx hardhat test
```

## Licencia

MIT