pragma solidity ^0.4.21;

contract GraveyardL1 {

    constructor() public {
        owner_address = msg.sender;
    }

    address owner_address;

    struct GraveLayer1 {
        uint candleStyle;
    }

    mapping(address => GraveLayer1) layer1;

    function setCandleStyle(uint _style) public {
        layer1[msg.sender].candleStyle = _style;
    }

    function getCandleStyle(address _addr) view public returns(uint) {
        return layer1[_addr].candleStyle;
    }

}