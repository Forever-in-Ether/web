var global = global || {};

const STORAGE_GRAVE_ADDRESS = "STORAGE_GRAVE_ADDRESS";

const priceFlower = 0.0005;
const priceCandle = 0.000000001;
const roundTo = -8;

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function round(x, n) {
    var a = Math.pow(10, n);
    return (Math.round(x / a) * a);
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

const getBlockAverageTime = async () => {
    const span = 100;
    const times = [];
    const currentNumber = await web3.eth.getBlockNumber();
    const firstBlock = await web3.eth.getBlock(currentNumber - span);
    let prevTimestamp = firstBlock.timestamp;
  
    for (let i = currentNumber - span + 1; i <= currentNumber; i++) {
      const block = await web3.eth.getBlock(i);
      let time = block.timestamp - prevTimestamp;
      prevTimestamp = block.timestamp;
      times.push(time);
    }
  
    return Math.round(times.reduce((a, b) => a + b) / times.length);
  }