var candle = candle || {};
candle.fill = async function(_amount) {
    var _value = round(_amount * priceCandle, roundTo);
    var tokens = Web3.utils.toWei(_value.toString(), 'ether');
    dialog.buy.finish();
    await candles.methods.fillCandle($("#find-address").val(), _amount).send({ from: selectedAccount, value: Web3.utils.toBN(tokens) });
};

candle.refresh = async function() {
    var graveAccount = localStorage.getItem(STORAGE_GRAVE_ADDRESS);
    result = await candles.methods.burningInfo(graveAccount).call();
    var burningText = 'No candle is burning.<br><a id="linkRefil">Refill ether candle.';

    // TODO: Add cool candle
    var firstLight = result[0];
    var fuel = result[1];
    var currentBlockNumber = result[2];

    var blocks = fuel - (currentBlockNumber - firstLight); // fuel;
    var candle = "0";
    if (blocks > 100) candle = "1";
    if (blocks > 500) candle = "2";
    if (blocks > 750) candle = "3";
    if (blocks > 1000) candle = "4";
    if (blocks > 10000) candle = "5";
    if (blocks > 100000) candle = "6";

    candleNum = candle;
    if (candleNum == "5" || candleNum == "6") candleNum = "4";
    var img = '<img id="imgCandle" class="candle" src="images/candle_' + candleNum + '.gif">';

    if (blocks > 0) {
        burningText = 'The candle is burning.<br>(' + parseInt(blocks) + ' Ether drops left)';
    }

    var candleContainer = $("#container-candle");
    if (candle == "5") {
        candleContainer.html('<span class="candle ci1">' + img + "</span>" + '<span class="candle ci2">' + img + "</span>" + '<br><div class="gift-text">' + burningText + "</div>");
    } else if (candle == "6") {
        candleContainer.html('<span class="candle ci1">' + img + "</span>" + '<span class="candle ci2">' + img + "</span>" + '<span class="candle ci3">' + img + "</span>" + '<br><div class="gift-text">' + burningText + "</div>");
    } else {
        candleContainer.html(img + '<br><div class="gift-text">' + burningText + "</div>");
    }

    $(".candle").click(function(event) {
        event.preventDefault();
        dialog.candle.buy.show();
    });

    $("#linkRefil").click(function(event) {
        event.preventDefault();
        dialog.candle.buy.show();
    });
}