var global = global || {};
global.contracts = global.contracts || {};

var contract = contract || {};
contract.Testament = {
    abi: [{
        "constant": true,
        "inputs": [{
            "name": "x",
            "type": "address"
        }],
        "name": "getHeritage",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }],

    address_test: "0x600764EE22E8e7FE9E30D112dDbEbE5dE6627257", // Test
    address: "" // Productive
};