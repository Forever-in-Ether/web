var global = global || {};
global.contracts = global.contracts || {};

var contract = contract || {};
contract.Relationship = {
    abi: [{
            "constant": true,
            "inputs": [{
                "name": "_addr",
                "type": "address"
            }],
            "name": "getFather",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_addr",
                "type": "address"
            }],
            "name": "setFather",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_addr",
                "type": "address"
            }],
            "name": "setMother",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "_addr",
                "type": "address"
            }],
            "name": "getMother",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "_mother",
                    "type": "address"
                },
                {
                    "name": "_father",
                    "type": "address"
                }
            ],
            "name": "setRelationship",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ],

    address_test: "0xe1ebbfdF2503bd6034f44CeF648A9528f4c25dC7", // Test
    address: "" // Productive
};