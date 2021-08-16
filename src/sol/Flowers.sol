// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.21;

contract Flowers {
    address owner_address;
    
    struct Grave {
        uint flower1;
        uint flower2;
        uint flower3;
        uint flower4;
        uint flower5;
    }

    mapping(address => Grave) graves;
    address[] public grave_address;
    

    constructor() public {
        owner_address = msg.sender;
    }

    function getGrave(address _address) view public returns(uint, uint, uint, uint, uint) {
        address x = _address;
        return (graves[x].flower1, graves[x].flower2, graves[x].flower3, graves[x].flower4, graves[x].flower5);
    }

    function buyFlower(address _address, uint flowerType, uint _amount) payable public {
        if (_amount > 0) {
            
            Grave storage grave = graves[_address];
            if (flowerType == 1) {
                grave.flower1 = grave.flower1 + _amount;
            }
            else if (flowerType == 2) {
                grave.flower2 = grave.flower2 + _amount;
            }
            else if (flowerType == 3) {
                grave.flower3 = grave.flower3 + _amount;
            }
            else if (flowerType == 4) {
                grave.flower4 = grave.flower4 + _amount;
            }
            else if (flowerType == 5) {
                grave.flower5 = grave.flower5 + _amount;
            }
            
            owner_address.transfer(msg.value / 100 * 45);
            _address.transfer(msg.value / 100 * 55);
        }
        else {
            revert();
        }        
    }
    
    function isBusy(address _address) internal view returns(bool) {
        for (uint i = 0; i < grave_address.length; i++) {
            if (grave_address[i] == _address) return true;
        }

        return false;
    }

}