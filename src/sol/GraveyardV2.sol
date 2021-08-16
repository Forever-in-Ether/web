// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.21;

contract GraveyardV2 {

    address graveyardV1;
    address owner_address;

    constructor() public {
        owner_address = msg.sender;
        graveyardV1 = 0x35a285EfF58DeF40F9967c7640aE7bc86386a440;
    }

    function showBalance() public view returns (uint) {
        if (msg.sender == owner_address) {
            return address(this).balance;
        } 
    }

    struct Grave {
        address heritage;
        string image;
        string name;
        string text;
        string birth;
        string death;
        string position;
    }

    mapping(address => Grave) graves;
    address[] public grave_address;

    event newGraveEvent(
        address grave_address
    );

    function getGraveyardV1() view public returns(address) {
        return graveyardV1;
    }

    function newGrave(string _image, string _name, address _heritage, string _dob, string _dod, string _text, string _position) public {
        Grave storage grave = graves[msg.sender];

        grave.image = _image;
        grave.name = _name;
        grave.heritage = _heritage;
        grave.birth = _dob;
        grave.death = _dod;
        grave.position = _position;
        grave.text = _text;
        grave_address.push(msg.sender)-1;
    
        emit newGraveEvent(msg.sender);
    }

    function getGraves() view public returns(address[]) {
        return grave_address;
    }

    function getGrave(address _address) view public returns(string, string, address, string, string, string, string) {
        address x = _address;
        return (graves[x].image, graves[x].name, graves[x].heritage, graves[x].birth, graves[x].death, graves[x].text, graves[x].position);
    }


    function getGraveAmount() public view returns(uint) {
        return grave_address.length;
    }

    function getHeritage(address x) public view returns(address) {
        return graves[x].heritage;
    }

    function claimHeritage(address x, string _date, string _position) public {
        if (msg.sender == graves[x].heritage) {
            graves[x].death = _date;
            graves[x].position = _position;
        }
        else {
            revert();
        }
    }
}