// https://etherscan.io/tx/0x342e205d7e877caed1e657d45680c645bbeb9c40f8d35068385d51b9bf3b7d00

var global = global || {};
global.contracts = global.contracts || {};

var contract = contract || {};
contract.Flowers = {
    abi: [{
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "uint256"
            }],
            "name": "grave_address",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "_address",
                "type": "address"
            }],
            "name": "getGrave",
            "outputs": [{
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "_address",
                    "type": "address"
                },
                {
                    "name": "flowerType",
                    "type": "uint256"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "buyFlower",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ],

    address_test: "0x3D34c84E90e6198AFC2cB3B30f7f7804C9224346", // Test
    address: "0xb1d6019bcEbfe1C4B63B4E2bc3b321AB4e435382" // Productive
};