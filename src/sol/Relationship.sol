pragma solidity ^0.4.21;

contract GraveyardL1 {

    constructor() public {
        owner_address = msg.sender;
    }

    address owner_address;

    struct GraveLayer1 {
        address mother;
        address father;
    }

    mapping(address => GraveLayer1) layer1;

    function setMother(address _addr) public {
        GraveLayer1 storage grave = layer1[msg.sender];
        grave.mother = _addr;
    }
    
    function setFather(address _addr) public {
        GraveLayer1 storage grave = layer1[msg.sender];
        grave.father = _addr;
    }
    
    function setRelationship(address _mother, address _father) public {
        GraveLayer1 storage grave = layer1[msg.sender];
        grave.mother = _mother;
        grave.father = _father;
    }

    function getMother(address _addr) public view returns(address) {
        return layer1[_addr].mother;
    }
    
    function getFather(address _addr) public view returns(address) {
        return layer1[_addr].father;
    }

}