// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DogNoseRegistry {
    string public constant name = "DogNoseRegistry";

    struct Dog {
        string name;
        address owner; // Dirección Ethereum del dueño
        string breed;
        uint256 age; // número entero
        string ownerContact;
        bool isRegistered;
    }

    // Mapping de hash de huella nasal a datos del perro
    mapping(bytes32 => Dog) public dogs;

    event DogRegistered(bytes32 noseHash, string name, address owner);
    event DogUpdated(bytes32 noseHash, string name, address owner);

    function registerDog(
        bytes32 _noseHash,
        string memory _name,
        string memory _breed,
        uint256 _age,
        string memory _ownerContact
    ) public {
        require(!dogs[_noseHash].isRegistered, "Este ya fue resgistrado");

        dogs[_noseHash] = Dog({
            name: _name,
            owner: msg.sender,
            breed: _breed,
            age: _age,
            ownerContact: _ownerContact,
            isRegistered: true
        });

        emit DogRegistered(_noseHash, _name, msg.sender);
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
            string memory ownerContact
        )
    {
        require(dogs[_noseHash].isRegistered, "Perro no encontrado");
        Dog memory dog = dogs[_noseHash];
        return (dog.name, dog.owner, dog.breed, dog.age, dog.ownerContact);
    }
}
