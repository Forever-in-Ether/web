var global = global || {};
global.contracts = global.contracts || {};

var contract = contract || {};
contract.GraveyardV2 = {
    abi: [{
            "constant": false,
            "inputs": [{
                    "name": "x",
                    "type": "address"
                },
                {
                    "name": "_date",
                    "type": "string"
                },
                {
                    "name": "_text",
                    "type": "string"
                },
                {
                    "name": "_position",
                    "type": "string"
                }
            ],
            "name": "claimHeritage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
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
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "_image",
                    "type": "string"
                },
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_heritage",
                    "type": "address"
                },
                {
                    "name": "_dob",
                    "type": "string"
                },
                {
                    "name": "_dod",
                    "type": "string"
                },
                {
                    "name": "_text",
                    "type": "string"
                },
                {
                    "name": "_position",
                    "type": "string"
                }
            ],
            "name": "newGrave",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getGraveyardV1",
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
            "inputs": [],
            "name": "showBalance",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
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
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getGraveAmount",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getGraves",
            "outputs": [{
                "name": "",
                "type": "address[]"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "name": "grave_address",
                "type": "address"
            }],
            "name": "newGraveEvent",
            "type": "event"
        }
    ],

    address_test: "0x0DcBa48F99EfBcCb9AB02d3A2Dde2283a5f4231C", // Test
    address: "" // Productive
};