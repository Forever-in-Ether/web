var dialog = dialog || {};
dialog.buy = dialog.buy || {};

dialog.wait = function(tx) {
    $("#dialog").attr("title", "Data sent!");
    $("#dialog").html('<p>Data sent to blockchain, please wait. This can take some minutes.</p> <a href="https://etherscan.io/tx/' + tx + '" target="_blank">See Transaction</a>');
    dialog.show();
}

dialog.msg = function(title, message) {
    $("#dialog").attr("title", title);
    $("#dialog").html('<p>' + message + '</p>');

    dialog.show();
}

dialog.flower = dialog.flower || {};
dialog.flower.buy = dialog.flower.buy || {};
dialog.flower.buy.show = function(address, name, flowerType) {
    $("#dialog").attr("title", "Purchase");
    $("#dialog").html('<p>How many flowers do you want to buy?</p><p id="outPrice" style="font-size: 10px;">Price: 0 Ether</p><input id="inFlower" type="number" placeholder="Amount" value="0"></input><button id="btnFlowerOk" style="float: right;">Buy</button>');
    
    $("#inFlower").on('input', function(e) {
        if ($("#inFlower").val() < 0) $("#inFlower").val("0");
        $("#outPrice").html('Price: ' + round($("#inFlower").val() * priceFlower, roundTo) + " Ether");
    });

    $("#btnFlowerOk").click(function(event) {
        flowers.buy(address, flowerType, $("#inFlower").val())
    });

    dialog.show();
}

dialog.candle = dialog.candle || {};
dialog.candle.buy = dialog.candle.buy || {};
dialog.candle.buy.show = function() {
    var day = 86400;
    var dayDrops = Math.round(day / 13.5).toFixed(0);
    var weekDrops = Math.round((day * 7) / 13.5).toFixed(0);
    var monthDrops = Math.round((day * 30) / 13.5).toFixed(0);
    var yearDrops = Math.round((day * 365) / 13.5).toFixed(0);

    $("#dialog").attr("title", "Purchase");
    $("#dialog").html('<p>How much Ether drops you want to fill to the candle?</p><p id="outRefilPrice" style="font-size: 10px;">Price: 0 Ether</p><input id="inputRefil" type="number" placeholder="Amount" value="0"></input><button id="btnRefilOk" style="float: right;">Fill</button><br><sub>Fill: <a href="javascript:candle.fill(\'' + dayDrops + '\');">1 day</a>, <a href="javascript:candle.fill(\'' + weekDrops + '\');">1 week</a>, <a href="javascript:candle.fill(\'' + monthDrops + '\');">1 month</a>, <a href="javascript:candle.fill(\'' + yearDrops + '\');">1 year</a></sub>');

    $("#inputRefil").on('input', function(e) {
        if ($("#inputRefil").val() < 0) $("#inputRefil").val("0");
        $("#outRefilPrice").html('Price: ' + round($("#inputRefil").val() * priceCandle, roundTo) + " Ether");
    });

    $("#btnRefilOk").click(function(event) {
        candle.fill($("#inputRefil").val());
    });

    dialog.show();
}

dialog.buy.finish = function() {
    $("#dialog").attr("title", "Ether received.");
    $("#dialog").html('<p>Network accepted your transaction. Your purchase is going to be shown in the next minutes.</p>');

    dialog.show();
}

dialog.show = function() {
    if ($("#dialog").hasClass("hidden")) $("#dialog").removeClass("hidden");
    $("#dialog").dialog({
        beforeClose: function(event, ui) {
            if (!$("#dialog").hasClass("hidden")) $("#dialog").addClass("hidden");
        }
    });
}