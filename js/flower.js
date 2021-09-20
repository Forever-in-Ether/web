const flowerPrice = 0.0005;

var flower = flower || {};

flower.refresh = async function() {
    var graveAccount = localStorage.getItem(STORAGE_GRAVE_ADDRESS);
    var flower = await flowers.methods.getGrave(graveAccount).call();

    $("#amount-flower1").html("White Aster<br><b>" + flower[0] + "</b>");
    $("#amount-flower2").html("Red Rose<br><b>" + flower[1] + "</b>");
    $("#amount-flower3").html("Ether Rose<br><b>" + flower[2] + "</b>");
}

flower.buy = async function(address, flowerType, amount) {
    var _value = round(amount * flowerPrice, roundTo);
    var tokens = Web3.utils.toWei(_value.toString(), 'ether');
    await flowers.methods.buyFlower(address, flowerType, amount).send({ from: selectedAccount, value: Web3.utils.toBN(tokens) });
    dialog.buy.finish();
}