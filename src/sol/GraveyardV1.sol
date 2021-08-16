pragma solidity ^0.4.21;

contract Graveyard {

    constructor() public {
        owner_address = msg.sender;
    }

    address owner_address;

    function showBalance() public view returns (uint) {
        if (msg.sender == owner_address) {
            return address(this).balance;
        } 
    }

    struct Grave {
        string image;
        string bg;
        string name;
        string text;
        string birth;
        string death;
        string latlng;
        uint inflammationBlock;
        uint fuel;
    }

    mapping(address => Grave) graves;
    address[] public grave_address;

    event newGraveEvent(
        address grave_address
    );

    event candleChangeEvent(
        address candle_address
    );    

    function newGrave(string _image, string _bg, string _name, string _dob, string _dod, string _text, string _latlng, address _address) public {
        Grave storage grave = graves[_address];

        bool locked = false;
        if (isBusy(_address)) {
            locked = true;
            if (msg.sender == _address) locked = false;
        }
        else {
            grave.inflammationBlock = block.number;
        }

        if (!locked) {
            grave.image = _image;
            grave.bg = _bg;
            grave.name = _name;
            grave.birth = _dob;
            grave.death = _dod;
            grave.latlng = _latlng;
            grave.text = _text;
            grave_address.push(_address)-1;
        }
        emit newGraveEvent(_address);
    }

    function getGraves() view public returns(address[]) {
        return grave_address;
    }

    function getGrave(address _address) view public returns(string, string, string, string, string, string, string) {
        address x = _address;
        return (graves[x].image, graves[x].bg, graves[x].name, graves[x].birth, graves[x].death, graves[x].text, graves[x].latlng);
    }


    function getGraveAmount() public view returns(uint) {
        return grave_address.length;
    }

    function isBusy(address _address) internal view returns(bool) {
        for (uint i = 0; i < grave_address.length; i++) {
            if (grave_address[i] == _address) return true;
        }

        return false;
    }

    function fillCandle(address _address, uint _amount) payable public {
        if (_amount > 0 && _amount > graves[_address].fuel) {
            graves[_address].fuel = (block.number - graves[_address].inflammationBlock) + _amount;
            owner_address.transfer(msg.value / 100 * 90);
            _address.transfer(msg.value / 100 * 10);
        }
        else {
            revert();
        }
        
        emit candleChangeEvent(_address);
    }

    function getName(address _address) public view returns (string) {
        return graves[_address].name;
    }

    function getDateOfBirth(address _address) public view returns (string) {
        return graves[_address].birth;
    }

    function getDateOfDeath(address _address) public view returns (string) {
        return graves[_address].death;
    }

    function getShortInfo(address _address) public view returns (string, string, string, address) {
        return (graves[_address].name, graves[_address].birth, graves[_address].death, _address);
    }    

    function isBurning(address _address) public view returns (uint, uint, uint) {
        return (graves[_address].inflammationBlock, graves[_address].fuel, block.number);
    }

}