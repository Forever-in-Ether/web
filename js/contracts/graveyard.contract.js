var global = global || {};
global.contracts = global.contracts || {};

var contract = contract || {};
contract.Graveyard = {
    abi: [{
            "constant": true,
            "inputs": [{
                "name": "_address",
                "type": "address"
            }],
            "name": "getDateOfBirth",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
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
            "name": "getDateOfDeath",
            "outputs": [{
                "name": "",
                "type": "string"
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
            "name": "getShortInfo",
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
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "address"
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
                    "name": "_bg",
                    "type": "string"
                },
                {
                    "name": "_name",
                    "type": "string"
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
                    "name": "_latlng",
                    "type": "string"
                },
                {
                    "name": "_address",
                    "type": "address"
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
            "constant": true,
            "inputs": [{
                "name": "_address",
                "type": "address"
            }],
            "name": "getName",
            "outputs": [{
                "name": "",
                "type": "string"
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
            "constant": false,
            "inputs": [{
                    "name": "_address",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "fillCandle",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
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
            "inputs": [{
                "name": "_address",
                "type": "address"
            }],
            "name": "isBurning",
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
                }
            ],
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
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "name": "candle_address",
                "type": "address"
            }],
            "name": "candleChangeEvent",
            "type": "event"
        }
    ],

    address_test: "0x33f8406C79ebf50e8DBeAC3fC97Cb963eB2b8D81", // Test
    address: "0x35a285EfF58DeF40F9967c7640aE7bc86386a440" // Productive
};