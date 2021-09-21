"use strict";

/**
 * JavaScript code that interacts with the page and Web3 wallets
 */

const test = true;

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
//const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
var web3Modal

// Chosen wallet provider given by the dialog window
var provider;

var web3;

// Address of the selected account
var selectedAccount;
var graveyard;
var relationship;
var candles;
var flowers;

function init() {
    $("#screen-main").hide();
    $("#screen-not-connected").show();

    console.log("WalletConnectProvider is", WalletConnectProvider);
    //console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
    console.log("window.ethereum is", window.ethereum);

    // Check that the web page is run in a secure context,
    // as otherwise MetaMask won't be available
    if (location.protocol !== 'https:') {
        // https://ethereum.stackexchange.com/a/62217/620
        const alert = document.querySelector("#alert-error-https");
        alert.style.display = "block";
        document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
        return;
    }

    // Tell Web3modal what providers we have available.
    // Built-in web browser provider (only one can exist as a time)
    // like MetaMask, Brave or Opera is added automatically by Web3modal
    const providerOptions = {
        torus: {
            package: Torus, // required
            display: {
                logo: "data:image/png;base64,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",
                name: "Google sign in",
                description: "Connect via Google, Facebook, Twitter, eMail or many more"
            },
        },
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "9d5998761b7048949d98ab65e0015582",
            }
        }
    };

    web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
    var graveyardAddress = contract.Graveyard.address;
    if (test) graveyardAddress = contract.Graveyard.address_test;

    var relationshipAddress = contract.Relationship.address;
    if (test) relationshipAddress = contract.Relationship.address_test;

    var candlesAddress = contract.Candles.address;
    if (test) candlesAddress = contract.Candles.address_test;

    var flowersAddress = contract.Flowers.address;
    if (test) flowersAddress = contract.Flowers.address_test;


    // Get a Web3 instance for the wallet
    web3 = new Web3(provider);
    graveyard = new web3.eth.Contract(contract.Graveyard.abi, graveyardAddress);
    relationship = new web3.eth.Contract(contract.Relationship.abi, relationshipAddress);
    candles = new web3.eth.Contract(contract.Candles.abi, candlesAddress);
    flowers = new web3.eth.Contract(contract.Flowers.abi, flowersAddress);

    graveyard.events.newGraveEvent(function(error, result) {
        if (!error) {
            menu.create.reset();
            initGrave(result.args.grave_address);
            initGraveList();
        } else
            console.log(error);
    });

    console.log("Web3 instance is", web3);

    // Get connected chain id from Ethereum node
    const chainId = await web3.eth.getChainId();
    isCorrectChain(chainId);

    if (window.ethereum) {
        window.ethereum.on('chainChanged', (chainId) => {
            isCorrectChain(chainId);
            console.log(chainId) // 0x38 if it's BSC
        });
    }

    // Load chain information over an HTTP API
    const chainData = evmChains.getChain(chainId);

    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();

    // MetaMask does not give you all accounts, only the selected account
    console.log("Got accounts", accounts);
    selectedAccount = accounts[0];

    // Display fully loaded UI for wallet data
    document.querySelector("#btn-connect").style.display = "none";


    startGraveyard();
}


async function refreshAccountData() {
    document.querySelector("#prepare").style.display = "block";
    await fetchAccountData(provider);
}

async function onConnect() {

    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
        $("#screen-main").show();
        $("#screen-not-connected").hide();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        $("#screen-main").hide();
        $("#screen-not-connected").show();
        return;
    }

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        location.reload();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        if (isCorrectChain(chainId)) location.reload();
    });

    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
        location.reload();
    });

    await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

    console.log("Killing the wallet connection", provider);

    // TODO: Which providers have close method?
    if (provider.close) {
        await provider.close();

        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await web3Modal.clearCachedProvider();
        provider = null;
    }

    selectedAccount = null;

    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
}

async function isCorrectChain(id) {
    //if (id == "4") { // Test 
    if (id == "0x1" || id == "4") { // Productive
        $("#screen-main").show();
        $("#screen-wrong-chain").hide();
        return true;
    } else {
        $("#screen-main").hide();
        $("#screen-wrong-chain").show();

        var params = [{ chainId: '0x1' }];
        if (test) params = [{ chainId: '4' }];
        if (window.ethereum) {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: params
            });
        }

        return false;
    }
}


/**
 * Main entry point.
 */
window.addEventListener('load', async() => {
    init();
    onConnect();
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
});