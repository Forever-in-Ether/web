const flowerPrice = 0.0005;

var flower = flower || {};

flower.refresh = async function() {
    var graveAccount = localStorage.getItem(STORAGE_GRAVE_ADDRESS);
    var result = await flowers.methods.getGrave(graveAccount).call();

    $("#amount-flower1").html("White Aster<br><b>" + result[0] + "</b>");
    $("#amount-flower2").html("Red Rose<br><b>" + result[1] + "</b>");
    $("#amount-flower3").html("Ether Rose<br><b>" + result[2] + "</b>");
}

flower.buy = async function(address, flowerType, amount) {
    var _value = round(amount * flowerPrice, roundTo);
    var tokens = Web3.utils.toWei(_value.toString(), 'ether');
    dialog.buy.finish();
    await flowers.methods.buyFlower(address, flowerType, amount).send({ from: selectedAccount, value: Web3.utils.toBN(tokens) });
}