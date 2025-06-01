// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IDogChain {
    string public constant name = "IDogChain";
    uint256 public totalDogs;

    struct Dog {
        string name;
        address owner;
        string breed;
        uint256 age;
        string ownerContact;
        bool isRegistered;
        uint256 registrationDate;
        uint256 lastUpdated;
    }

    mapping(bytes32 => Dog) public dogs;
    mapping(address => bytes32[]) public ownerToDogs;

    event DogRegistered(
        bytes32 noseHash,
        string name,
        address owner,
        uint256 timestamp
    );

    event DogUpdated(
        bytes32 noseHash,
        string name,
        address owner,
        uint256 timestamp
    );

    event DogRemoved(bytes32 noseHash, address owner, uint256 timestamp);

    modifier onlyDogOwner(bytes32 _noseHash) {
        require(dogs[_noseHash].isRegistered, "Perro no encontrado");
        require(
            dogs[_noseHash].owner == msg.sender,
            "No eres el propietario del perro"
        );
        _;
    }

    function registerDog(
        bytes32 _noseHash,
        string memory _name,
        string memory _breed,
        uint256 _age,
        string memory _ownerContact
    ) public {
        require(!dogs[_noseHash].isRegistered, "Este perro ya fue registrado");
        require(bytes(_name).length > 0, "El nombre no puede estar vacio");
        require(bytes(_breed).length > 0, "La raza no puede estar vacia");
        require(_age < 40, "Edad invalida");
        require(
            bytes(_ownerContact).length > 0,
            "El contacto no puede estar vacio"
        );

        dogs[_noseHash] = Dog({
            name: _name,
            owner: msg.sender,
            breed: _breed,
            age: _age,
            ownerContact: _ownerContact,
            isRegistered: true,
            registrationDate: block.timestamp,
            lastUpdated: block.timestamp
        });

        ownerToDogs[msg.sender].push(_noseHash);
        totalDogs++;

        emit DogRegistered(_noseHash, _name, msg.sender, block.timestamp);
    }

    function getDog(
        bytes32 _noseHash
    )
        public
        view
        returns (
            string memory dogName,
            address owner,
            string memory breed,
            uint256 age,
            string memory ownerContact,
            uint256 registrationDate,
            uint256 lastUpdated
        )
    {
        require(dogs[_noseHash].isRegistered, "Perro no encontrado");
        Dog memory dog = dogs[_noseHash];
        return (
            dog.name,
            dog.owner,
            dog.breed,
            dog.age,
            dog.ownerContact,
            dog.registrationDate,
            dog.lastUpdated
        );
    }

    function updateDog(
        bytes32 _noseHash,
        string memory _name,
        string memory _breed,
        uint256 _age,
        string memory _ownerContact
    ) public onlyDogOwner(_noseHash) {
        require(bytes(_name).length > 0, "El nombre no puede estar vacio");
        require(bytes(_breed).length > 0, "La raza no puede estar vacia");
        require(_age < 40, "Edad invalida");
        require(
            bytes(_ownerContact).length > 0,
            "El contacto no puede estar vacio"
        );

        dogs[_noseHash].name = _name;
        dogs[_noseHash].breed = _breed;
        dogs[_noseHash].age = _age;
        dogs[_noseHash].ownerContact = _ownerContact;
        dogs[_noseHash].lastUpdated = block.timestamp;

        emit DogUpdated(_noseHash, _name, msg.sender, block.timestamp);
    }

    function removeDog(bytes32 _noseHash) public onlyDogOwner(_noseHash) {
        bytes32[] storage ownerDogs = ownerToDogs[msg.sender];
        for (uint i = 0; i < ownerDogs.length; i++) {
            if (ownerDogs[i] == _noseHash) {
                ownerDogs[i] = ownerDogs[ownerDogs.length - 1];
                ownerDogs.pop();
                break;
            }
        }

        delete dogs[_noseHash];
        totalDogs--;

        emit DogRemoved(_noseHash, msg.sender, block.timestamp);
    }

    function getOwnerDogs() public view returns (bytes32[] memory) {
        return ownerToDogs[msg.sender];
    }

    function getDogCount() public view returns (uint256) {
        return totalDogs;
    }
}
