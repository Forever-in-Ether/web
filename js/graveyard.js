var global = global || {};
var menu = menu || {};
var dialog = dialog || {};
var graveyard = graveyard || {};
var relationship = relationship || {};
var dialog = dialog || {};

const aliveDod = "00/00/0000";

var selectedGrave = "";
var tempDod = "00/00/0000";
var tempLat = "0";
var tempLng = "0";

var aliveCheckedText = "";
var aliveUncheckedText = "";

var containerDeadsMessage, findAddress, btnFindGrave, btnCreateReset, btnOpenCreateNew, btnCreateDo, btnCreateClose, nograve, chkAlive, inDod, lblDod, inHeritage, heritageStoneText, stoneTextContainer, inHeritageMessage, btnOpenHeritage, menuHeritage, inHeritageClaimDob, btnHeritageClaim, btnHeritageClose, btnOwnGrave, relationshipSettings, btnSettingsRelationshipClose, btnGraveEdit, inHeritageLat, inHeritageLng, gravePositioning, inputCreateGraveLat, inputCreateGraveLng, mapCreateContainer, graveMapContainer, gravePortraitContainer, graveNameContainer, graveDateContainer, graveTextContainer, graveGiftsContainer, relationshipContainer, deadsmessage, inStoneText;

async function startGraveyard() {
    $(document).tooltip();
    $("#grave").addClass("hidden");

    var pk = await web3.eth.getAccounts();
    console.log("Private Key: " + pk);

    findAddress = $("#find-address");
    btnFindGrave = $("#btnFindGrave");
    btnCreateReset = $("#btnCreateReset");
    btnOpenCreateNew = $(".createEdit-button");
    btnCreateDo = $("#btnCreateDo");
    btnCreateClose = $("#btnCreateClose");
    nograve = $("#no-grave");
    chkAlive = $("#create-grave-alive");
    inDod = $("#create-grave-dod");
    lblDod = $("#lbl-create-grave-dod");
    inHeritage = $("#create-grave-heritage");
    inHeritageMessage = $("#create-grave-heritage-message-container");
    btnOpenHeritage = $("#container-grave-claim-heritage");
    menuHeritage = $("#menu-heritage");
    heritageStoneText = $("#input-claim-heritag-grave-text");
    inHeritageClaimDob = $("#input-claim-heritage-dob");
    btnHeritageClaim = $("#btn-claim-heritage-claim");
    btnHeritageClose = $("#btn-claim-heritage-close");
    btnOwnGrave = $("#btn-grave-own");
    relationshipSettings = $("#container-grave-settings");
    btnSettingsRelationshipClose = $("#btn-settings-close");
    btnGraveEdit = $("#container-grave-edit");
    inHeritageLat = $("#input-claim-heritage-lat");
    inHeritageLng = $("#input-claim-heritage-lng");
    gravePositioning = $("#grave-positioning");
    inputCreateGraveLat = $("#create-grave-pos-lat");
    inputCreateGraveLng = $("#create-grave-pos-lng");
    mapCreateContainer = $("#map-create");
    graveMapContainer = $("#map-grave");
    gravePortraitContainer = $("#container-grave-image");
    graveNameContainer = $("#container-grave-name");
    graveDateContainer = $("#container-grave-date");
    graveTextContainer = $("#container-grave-text");
    graveGiftsContainer = $("#container-gifts");
    stoneTextContainer = $("#create-grave-text-container");
    relationshipContainer = $("#container-grave-relationship");
    deadsmessage = $("#deads-message");
    inStoneText = $("#create-grave-text");
    containerDeadsMessage = $("#deads-message-container");

    btnOwnGrave.on("click", function() {
        initGrave(selectedAccount);
    })

    menuHeritage.hide();

    $('.chk-alive').change(function() {
        checkAlive(this.checked);
    });
    //map.width("100%");
    //map.height(screen.height / 2);

    var params = [{ chainId: '0x1' }]; // Productive
    if (!test) {
        if (window.ethereum) {
            await window.ethereum.request({
                "method": "wallet_switchEthereumChain",
                "params": params
            });
        }
    }

    document.querySelector("#btn-connect").addEventListener("click", onConnect);

    btnFindGrave.click(function() {
        var addressField = $("#find-address");
        if (addressField.val()) {
            if (addressField.val().startsWith("0x")) {
                initGrave(addressField.val());
            }

            findAddress.select();
        } else {
            addressField.val(selectedAccount);
        }


    });

    findAddress.keypress(function(e) {
        if (e.which == 13) {
            $("#btnFindGrave").click();
            return false;
        }
    });

    btnCreateReset.click(function() {
        menu.create.reset();
    });

    btnOpenCreateNew.click(function() {
        if (menu.create.view.hasClass("hidden")) {
            menu.create.open();
            nograve.hide();
        } else {
            menu.create.close();
            nograve.show();
        }
    });

    btnCreateDo.click(function() {
        createNewGrave();
    });

    btnCreateClose.click(function() {
        menu.create.close();
        nograve.show();
        btnGraveEdit.show();
    });

    menu.create.reset();

    if (findAddress.val() == "") {
        findAddress.val(selectedAccount);
    }

    initRecentGraves();
}

async function createNewGrave() {
    var portrait = $("#output-upload-portrait").val();
    var bg = $("#output-upload-background").val();
    var name = $("#create-grave-name").val();
    var heritage = $("#create-grave-heritage").val();
    var dob = $("#create-grave-dob").val();
    var dod = $("#create-grave-dod").val();
    var text = inStoneText.val();
    var lat = inputCreateGraveLat.val();
    var lng = inputCreateGraveLng.val();
    var position = lat + "," + lng;

    if (heritage == "") heritage = "0x1E1a62760756bAD57a5b25b889A65DDa7EBDe630";

    var alive = dod == aliveDod;
    if (alive) text = CryptoJS.AES.encrypt(text, heritage).toString();

    var c1 = name.length > 0;
    var c2 = (dob.length > 0) && ($("#create-grave-dob").val().split("/").length === 3);
    var c3 = dod.length > 0 && ($("#create-grave-dod").val().split("/").length === 3);

    if (c1 && c2 && c3) {
        btnGraveEdit.show();
        menu.create.close();
        result = await graveyardV2.methods.newGrave(portrait + "<||>" + bg, name, heritage, dob, dod, text, position).send({ from: selectedAccount });
        dialog.wait(result);
    }

    if (!c1) {
        $("#create-grave-name").addClass("warning");
    } else {
        $("#create-grave-name").removeClass("warning");
    }

    if (!c2) {
        $("#create-grave-dob").addClass("warning");
    } else {
        $("#create-grave-dob").removeClass("warning");
    }

    if (!c3) {
        $("#create-grave-dod").addClass("warning");
    } else {
        $("#create-grave-dod").removeClass("warning");
    }
}

async function initGrave(fromAccount) {
    btnOpenHeritage.hide();

    localStorage.setItem(STORAGE_GRAVE_ADDRESS, fromAccount);
    currentGrave = await callGrave(fromAccount);

    var mother = await relationship.methods.getMother(fromAccount).call();
    var father = await relationship.methods.getFather(fromAccount).call();

    var portrait = currentGrave.getPortrait();
    var bg = currentGrave.getBackground();
    var name = currentGrave.getName();
    var heritage = currentGrave.getHeritage();
    var dob = currentGrave.getBirth();
    var dod = currentGrave.getDeath();
    var text = currentGrave.getText();
    var lat = currentGrave.getLatitude();
    var lng = currentGrave.getLongitude();

    if (name !== "" && dob !== "") {
        $("#grave").removeClass("hidden");
        $("#no-grave").addClass("hidden");
        $("#grave-create").addClass("hidden");
        $("#container-gifts").removeClass("hidden");

        $("#find-address").val(fromAccount);
        $('#grave').css('background-image', 'url(' + bg + ')');
        $("#create-grave-name").val(name);
        inHeritage.val(heritage);
        $("#create-grave-dob").val(dob);
        inDod.val(dod);
        $("#output-upload-portrait").val(portrait);
        $("#output-upload-background").val(bg);
        inputCreateGraveLat.val(lat);
        inputCreateGraveLng.val(lng);

        var dodPart = " - †" + dod;
        if (dod == aliveDod) dodPart = "<br><b>alive</b>";
        $("#container-grave-image").html('<img src="' + portrait + '">');
        $("#container-grave-name").html("<b>" + name + "</b>");
        $("#container-grave-date").html("*" + dob + dodPart);

        if (selectedAccount == heritage) {
            initHeritageClaiming(fromAccount);
        }

        tempDod = dod;
        tempLat = lat;
        tempLng = lng;

        checked = inDod.val() == aliveDod;
        chkAlive.prop('checked', checked);
        if (text != "") {
            if (checked) aliveCheckedText = CryptoJS.AES.decrypt(text, inHeritage.val()).toString(CryptoJS.enc.Utf8);
            else aliveUncheckedText = text;
        }
        checkAlive(checked);

        // Mother & Father
        var containerRelationship = $("#container-grave-relationship");
        containerRelationship.show();

        var textMother = '<a href="index.html?g=' + mother + '">Mother</a>';
        var textFather = '<a href="index.html?g=' + father + '">Father</a>';
        var textRelationship = "";
        var undefinedAddress = "0x0000000000000000000000000000000000000000";
        if (mother != undefinedAddress && father != undefinedAddress) {
            textRelationship = textMother + " & " + textFather;
        } else if (mother != undefinedAddress && father == undefinedAddress) {
            textRelationship = textMother;
        } else if (mother == undefinedAddress && father != undefinedAddress) {
            textRelationship = textFather;
        } else {
            containerRelationship.hide();
        }
        containerRelationship.html("<br>" + textRelationship);

        // Grave text
        if (dod != aliveDod) graveTextContainer.html(text);
        if (lat == "" || lng == "" || lat == "0" && lng == "0") {
            graveMapContainer.hide();
        } else {
            clearOverlays();
            var graveLatLng = { "lat": parseFloat(lat), "lng": parseFloat(lng) };
            if (mapGrave) mapGrave.setCenter(graveLatLng);
            var info = new google.maps.InfoWindow({
                content: currentGrave.getName(),
                position: graveLatLng,
            });
            markersArray.push(info);
            info.open(mapGrave);
            graveMapContainer.show();
        }

        initRelations(fromAccount);

        if (selectedAccount == fromAccount) {
            btnGraveEdit.show();

            btnGraveEdit.click(function() {
                if (menu.create.view.hasClass("hidden")) {
                    menu.create.open();
                    btnGraveEdit.hide();
                }
            });
        } else {
            btnGraveEdit.hide();
        }

    } else {
        $("#no-grave").removeClass("hidden")
        $("#no-grave").removeClass("hidden");
        $("#grave").addClass("hidden");

        if (selectedAccount != null) {
            var btnGraveSetup = $("#btn-grave-setup");
            if (selectedAccount == fromAccount) {
                btnGraveSetup.show();

            } else {
                btnGraveSetup.hide();
            }
        }
    }

    var flower1 = $("#flower1");
    var flower2 = $("#flower2");
    var flower3 = $("#flower3");

    flower1.on("click", function() {
        event.preventDefault();
        dialog.flower.buy.show(fromAccount, result[2], 1);
    });

    flower2.on("click", function() {
        event.preventDefault();
        dialog.flower.buy.show(fromAccount, result[2], 2);
    });

    flower3.on("click", function() {
        event.preventDefault();
        dialog.flower.buy.show(fromAccount, result[2], 3);
    });

    refreshFlowers(fromAccount);
    refreshCandle();

    setInterval(async function() {
        refreshCandle();
        refreshFlowers(fromAccount);
    }, 30000);
}

async function initRecentGraves() {
    var result = await graveyard.methods.getGraves().call();
    var result2 = await graveyardV2.methods.getGraves().call();
    var addresses = [];
    var maxResults = 50;

    $("#ul-gl").html("");

    var startIntV2 = result2.length;
    if (startIntV2 > maxResults) startIntV2 = maxResults;
    for (var i = startIntV2; i > -1; i--) {
        var graveAddress = result2[result2.length - i];

        if (!addresses.includes(graveAddress)) {
            addresses.push(graveAddress);
            var nextGraveV2 = await callGrave(graveAddress);
            if (nextGraveV2) {
                var name = nextGraveV2.getName();

                var yearBirth = nextGraveV2.getBirth().split('/')[2];
                var yearDeath = nextGraveV2.getDeath().split('/')[2];

                if (graveAddress) outputRecentGrave(graveAddress, name, yearBirth, yearDeath);
            }
        }
    }

    var startIntV1 = result.length;
    if (startIntV1 > maxResults) startIntV1 = maxResults;
    for (var j = startIntV1; j > -1; j--) {
        var graveAddress = result[result.length - j];

        if (!addresses.includes(graveAddress)) {
            addresses.push(graveAddress);
            var nextGraveV1 = await callGrave(graveAddress);
            if (nextGraveV1) {
                var name = nextGraveV1.getName();

                var yearBirth = nextGraveV1.getBirth().split('/')[2];
                var yearDeath = nextGraveV1.getDeath().split('/')[2];

                if (graveAddress) outputRecentGrave(graveAddress, name, yearBirth, yearDeath);
            }
        }
    }
}

function outputRecentGrave(graveAddress, name, yearBirth, yearDeath) {
    if (name || yearBirth || yearDeath) {
        var lifetime = yearBirth + ' - ' + yearDeath;
        if (yearDeath == "0000") lifetime = "still alive";
        var text = '<a title="' + lifetime + '" href="index.html?g=' + graveAddress + '" onclick="initGrave(\'' + graveAddress + '\'); return false;"><li class="list-updated-graves">' + name + '</li></a>';
        $("#ul-gl").append('|' + text + '|');
    }
}

async function initRelations(address) {
    if (selectedAccount == address) {
        menu.relationship = {
            view: $("#menu-relationship"),
            open: function() {
                if (this.view.hasClass("hidden")) {
                    this.view.removeClass("hidden");
                }
            },

            reset: function(address) {

            },

            close: function() {
                if (!this.view.hasClass("hidden")) {
                    this.view.addClass("hidden");
                }
            }
        }

        var addressMother = await relationship.methods.getMother(address).call();
        var addressFather = await relationship.methods.getFather(address).call();
        $("#in-address-mother").val(addressMother);
        $("#in-address-father").val(addressFather);

        relationshipSettings.on("click", function() {
            menu.relationship.open();
            relationshipSettings.hide();

            graveInfo.hide();
        });

        btnSaveRelations = $("#btn-settings-save");
        btnSaveRelations.on("click", async function() {
            setRelationship($("#in-address-mother").val(), $("#in-address-father").val());
            menu.relationship.close();
            graveInfo.show();
            relationshipSettings.show();
        });

        btnGraveSettingsClose = $("#btn-settings-close");
        btnGraveSettingsClose.on("click", async function() {
            menu.relationship.close();
            graveInfo.show();
            relationshipSettings.show();
        });
        relationshipSettings.show();
    } else {
        relationshipSettings.hide();
    }
}

async function setRelationship(addressMother, addressFather) {
    var emptyAddress = "0x0000000000000000000000000000000000000000";
    if (addressMother == emptyAddress) addressMother = "";
    if (addressFather == emptyAddress) addressFather = "";

    if (addressMother != "" && addressFather == "") {
        await relationship.methods.setMother(addressMother).send({ from: selectedAccount });
    } else if (addressFather != "" && addressMother == "") {
        await relationship.methods.setFather(addressFather).send({ from: selectedAccount });
    } else if (addressMother != "" && addressFather != "") {
        await relationship.methods.setRelationship(addressMother, addressFather).send({ from: selectedAccount });
    }
}

async function initHeritageClaiming(fromAccount) {
    containerDeadsMessage.show();

    selectedGrave = fromAccount;
    heritageGrave = await callGrave(fromAccount);
    var position = heritageGrave.getPosition();
    inHeritageLat.val(heritageGrave.getLatitude(position));
    inHeritageLng.val(heritageGrave.getLongitude(position));

    var encryptedAES = heritageGrave.getText();
    var text = CryptoJS.AES.decrypt(encryptedAES, heritageGrave.getHeritage()).toString(CryptoJS.enc.Utf8);
    if (text != "") deadsmessage.text(text);
    else containerDeadsMessage.hide();

    btnOpenHeritage.show();
    inHeritageClaimDob.datepicker();
    btnOpenHeritage.on("click", async function() {
        menuHeritage.show();
        btnOpenHeritage.hide();
        graveMapContainer.show();


        relationshipContainer.hide();
        graveInfo.hide();
        graveGiftsContainer.hide();
    });

    btnHeritageClose.on("click", async function() {
        menuHeritage.hide();
        btnOpenHeritage.show();
        graveMapContainer.hide();

        relationshipContainer.show();
        graveInfo.show();
        graveGiftsContainer.show();
    });

    btnHeritageClaim.on("click", async function() {
        claimHeritage(selectedGrave);
        graveMapContainer.hide();

        graveInfo.show();
        graveGiftsContainer.show();
    });
}

async function claimHeritage(grave) {
    btnHeritageClose.click();
    var position = inHeritageLat.val() + "," + inHeritageLng.val();
    var stoneText = heritageStoneText.val();
    await graveyardV2.methods.claimHeritage(grave, inHeritageClaimDob.val(), stoneText, position).send({ from: selectedAccount });
    initGrave(selectedGrave);
}

async function refreshCandle() {
    var graveAccount = localStorage.getItem(STORAGE_GRAVE_ADDRESS);
    result = await graveyard.methods.isBurning(graveAccount).call();
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

var candle = candle || {};
candle.fill = async function(_amount) {
    var _value = round(_amount * priceCandle, roundTo);
    var tokens = Web3.utils.toWei(_value.toString(), 'ether');
    await graveyard.methods.fillCandle($("#find-address").val(), _amount).send({ from: selectedAccount, value: Web3.utils.toBN(tokens) });
    dialog.buy.finish();

};

function resetUpload() {
    var portraitInput = $("#input-upload-portrait");
    var portraitOutput = $("#output-upload-portrait");
    var portraitLabel = $("#label-upload-portrait");

    var backgroundInput = $("#input-upload-background");
    var backgroundOutput = $("#output-upload-background");
    var backgroundLabel = $("#label-upload-background");

    portraitInput.show();
    portraitLabel.hide();
    portraitOutput.hide();

    backgroundInput.show();
    backgroundLabel.hide();
    backgroundOutput.hide();

}

graveInfo = {
    show: function() {
        gravePortraitContainer.show();
        graveNameContainer.show();
        graveDateContainer.show();
        graveTextContainer.show();
    },
    hide: function() {
        gravePortraitContainer.hide();
        graveNameContainer.hide();
        graveDateContainer.hide();
        graveTextContainer.hide();
    }
}

menu.create = {
    view: $("#grave-create"),
    open: function() {
        $("#create-grave-dob").datepicker();
        $("#create-grave-dod").datepicker();
        if (this.view.hasClass("hidden")) {
            this.view.removeClass("hidden");
        }
    },

    reset: function(address) {
        $("#input-upload-portrait").val("");
        $("#input-upload-background").val("");
        resetUpload();
        $("#create-grave-name").val("");
        $("#create-grave-dob").val("");
        $("#create-grave-dod").val("");
        inStoneText.val("");
        inputCreateGraveLat.val("");
        inputCreateGraveLng.val("");

        var findAddress = $("#find-address");
        addressGET = findGetParameter("g");
        if (addressGET == null || addressGET == undefined) {
            if (address) {
                findAddress.val(address);
                if (!findAddress.val().startsWith("0x")) {
                    findAddress.val(selectedAccount);
                }
            } else {
                initGrave(selectedAccount)
                console.log("Create-Menu: No account");
            }
        } else {
            findAddress.val(addressGET);
            initGrave(addressGET);
        }

    },

    close: function() {
        if (!this.view.hasClass("hidden")) {
            this.view.addClass("hidden");
        }
    }
}

function checkAlive(checked) {
    if (checked) {
        inDod.hide();
        lblDod.hide();
        gravePositioning.hide();
        graveGiftsContainer.hide();
        inHeritageMessage.show();
        stoneTextContainer.hide();

        tempDod = inDod.val();
        inDod.val(aliveDod);
        tempLat = inputCreateGraveLat.val();
        tempLng = inputCreateGraveLng.val();
        inputCreateGraveLat.val("0");
        inputCreateGraveLng.val("0");

        aliveUncheckedText = inStoneText.val();
        inStoneText.val(aliveCheckedText);
    } else {
        inputCreateGraveLat.val(tempLat);
        inputCreateGraveLng.val(tempLng);
        tempLat = "0";
        tempLng = "0";
        inDod.val(tempDod);
        tempDod = aliveDod;
        inDod.show();
        lblDod.show();
        gravePositioning.show();
        graveGiftsContainer.show()
        inHeritageMessage.hide();
        stoneTextContainer.show();
        aliveCheckedText = inStoneText.val();
        inStoneText.val(aliveUncheckedText);
    }
}