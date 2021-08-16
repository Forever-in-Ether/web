pragma solidity ^0.4.21;

contract Graveyard {
    function getHeritage(address x) public view returns(address) {}
}

contract Testament {
    
    Graveyard graveyard;
    address graveyard_address;

    address owner_address;
    address[] public grave_address;

    constructor() public {
        owner_address = msg.sender;
        graveyard_address = 0xb95cb2110A7A9108094Ef1FA40c5d04F756cF5fD;
        graveyard = Graveyard(graveyard_address);
    }

    struct Testament {
        string text;
    }

    mapping(address => Testament) testaments;
    
    function getText(address x) view public returns(string) {
        if (msg.sender == graveyard.getHeritage(x) || msg.sender == x) return testaments[x].text;
        else revert();
    }
    
    function setText(address x, string text) public {
        if (msg.sender == x) {
            testaments[x].text = text;
        }
    }
    
}