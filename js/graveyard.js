var global = global || {};
var grave = grave || {};
var dialog = dialog || {};
var graveyard = graveyard || {};
var relationship = relationship || {};
var dialog = dialog || {};

const aliveDod = "00.00.0000";

var currentGrave = "";
var selectedGrave = "";
var tempDod = "00.00.0000";
var tempLat = "0";
var tempLng = "0";

var aliveCheckedText = "";
var aliveUncheckedText = "";
var blocktime = 13.5;

async function startGraveyard() {
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

    $(document).tooltip();
    $("#grave").hide();

    $("#grave-heritage").hide();

    $("#btn-grave-own").on("click", function() {
        initGrave(selectedAccount);
    });

    $("#btnFindGrave").click(function() {
        var addressField = $("#find-address");
        if (addressField.val()) {
            if (addressField.val().startsWith("0x")) {
                initGrave(addressField.val());
            }

            $("#find-address").select();
        } else {
            addressField.val(selectedAccount);
        }
    });

    $("#find-address").keypress(function(e) {
        if (e.which == 13) {
            $("#btnFindGrave").click();
            return false;
        }
    });

    $(".createEdit-button").click(function() {
        if (grave.create.view.is(":hidden")) {

            $("#no-grave").hide();
            grave.create.show(function() {
                $("#no-grave").show();
            });
        } else {
            $("#no-grave").show();
        }
    });

    if ($("#find-address").val() == "") {
        $("#find-address").val(selectedAccount);
    }

    
    addressGET = findGetParameter("g");
    if (addressGET != null && addressGET != undefined) {
        $("#find-address").val(addressGET);
        initGrave(addressGET);
    }
    else {
        initGrave(selectedAccount);
    }

    initRecentGraves();
    blocktime = await getBlockAverageTime();
}

async function initGrave(fromAccount) {
    $("#find-address").val(fromAccount);

    grave.create.hide();
    grave.create.reset();
    grave.relationship.hide();
    grave.heritage.hide();
    $("#btn-grave-claim-heritage").hide();

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
        $("#grave").show();
        graveInfo.show();

        $("#grave").show();
        $("#no-grave").hide();
        $("#grave-create").hide();
        $("#container-gifts").show();

        $("#find-address").val(fromAccount);
        $('#grave').css('background-image', 'url(' + bg + ')');
        $("#create-grave-name").val(name);
        $("#create-grave-heritage").val(heritage);
        $("#create-grave-dob").val(dob);
        $("#create-grave-dod").val(dod);
        $("#output-upload-portrait").val(portrait);
        $("#output-upload-background").val(bg);
        $("#create-grave-pos-lat").val(lat);
        $("#create-grave-pos-lng").val(lng);

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

        checked = $("#create-grave-dod").val() == aliveDod;
        $("#create-grave-alive").prop('checked', checked);
        if (text != "") {
            if (checked) aliveCheckedText = CryptoJS.AES.decrypt(text, $("#create-grave-heritage").val()).toString(CryptoJS.enc.Utf8);
            else aliveUncheckedText = text;
        }
        checkAlive(checked);

        // Mother & Father
        $("#container-grave-relationship").show();

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
            $("#container-grave-relationship").hide();
        }
        $("#container-grave-relationship").html("<br>" + textRelationship);

        // Grave text
        if (dod != aliveDod) $("#container-grave-text").html(text);
        else $("#container-grave-text").html("");
        if (lat == "" || lng == "" || lat == "0" && lng == "0") {
            $("#map-grave").hide();
        } else {
            clearOverlays();
            var graveLatLng = { "lat": parseFloat(lat), "lng": parseFloat(lng) };
            if (mapGrave) mapGrave.setCenter(graveLatLng);

            try {
                var info = new google.maps.InfoWindow({
                    content: currentGrave.getName(),
                    position: graveLatLng,
                });
                markersArray.push(info);
                info.open(mapGrave);
            }
            catch(e) {
                console.log(e);
            }

            $("#map-grave").show();
        }

        initRelations(fromAccount);

        if (selectedAccount == fromAccount) {
            $("#btn-grave-edit").show();

            $("#btn-grave-edit").click(function() {
                $("#grave").hide();
                grave.create.show(function() {
                    $("#grave").show();
                });
            });
        } else {
            $("#btn-grave-edit").hide();
            $("#btn-grave-settings").hide();
            $("#grave-relationship").hide();
        }
    } else {
        grave.empty.show(function() {
            $("#grave").show();
            graveInfo.show();
        });
        $("#grave").hide();
        graveInfo.hide();
        if (selectedAccount != null) {
            if (selectedAccount == fromAccount) {
                $("#btn-grave-setup").show();
    
            } else {
                $("#btn-grave-setup").hide();
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

    candle.refresh();
    flower.refresh();
    setInterval(async function() {
        candle.refresh();
        flower.refresh();
    }, 30000);
}

async function createNewGrave() {
    var portrait = $("#output-upload-portrait").val();
    var bg = $("#output-upload-background").val();
    var name = $("#create-grave-name").val();
    var heritage = $("#create-grave-heritage").val();
    var dob = $("#create-grave-dob").val();
    var dod = $("#create-grave-dod").val();
    var text = $("#create-grave-text").val();
    var lat = $("#create-grave-pos-lat").val();
    var lng = $("#create-grave-pos-lng").val();
    var position = lat + "," + lng;

    if (heritage == "") heritage = "0x1E1a62760756bAD57a5b25b889A65DDa7EBDe630";

    var alive = dod == aliveDod;
    if (alive) text = CryptoJS.AES.encrypt(text, heritage).toString();

    var c1 = name.length > 0;
    var c2 = (dob.length > 0) && ($("#create-grave-dob").val().split(".").length === 3);
    var c3 = dod.length > 0 && ($("#create-grave-dod").val().split(".").length === 3);

    if (!alive && c1 && c2 && c3 || alive && c1 && c2) {
        $("#btn-grave-edit").show();
        grave.create.hide();
        result = await graveyard.methods.newGrave(portrait + "<||>" + bg, name, heritage, dob, dod, text, position).send({ from: selectedAccount });
        initGrave(selectedAccount);
        initRecentGraves();
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

    if (!alive && !c3) {
        $("#create-grave-dod").addClass("warning");
    } else {
        $("#create-grave-dod").removeClass("warning");
    }
}

async function initRecentGraves() {
    var result = await graveyard.methods.getGraves().call();
    var addresses = [];
    var maxResults = 50;

    $("#ul-gl").html("");

    var startInt = result.length;
    if (startInt > maxResults) startInt = maxResults;
    for (var i = startInt; i > -1; i--) {
        var graveAddress = result[result.length - i];

        if (!addresses.includes(graveAddress)) {
            addresses.push(graveAddress);
            var nextGrave = await callGrave(graveAddress);
            if (nextGrave) {
                var name = nextGrave.getName();

                var yearBirth = nextGrave.getBirth().split('.')[2];
                var yearDeath = nextGrave.getDeath().split('.')[2];

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
        var addressMother = await relationship.methods.getMother(address).call();
        var addressFather = await relationship.methods.getFather(address).call();
        $("#in-address-mother").val(addressMother);
        $("#in-address-father").val(addressFather);

        $("#btn-grave-settings").on("click", function() {
            graveInfo.hide();
            $("#btn-grave-edit").hide();
            $("#btn-grave-settings").hide();

            grave.relationship.show(function() {
                graveInfo.show();
                $("#btn-grave-edit").show();
            $("#btn-grave-settings").show();
            });
        });

        btnSaveRelations = $("#btn-settings-save");
        btnSaveRelations.on("click", async function() {
            setRelationship($("#in-address-mother").val(), $("#in-address-father").val());
            grave.relationship.hide();
            graveInfo.show();
            $("#btn-grave-settings").show();
        });

        btnGraveSettingshide = $("#btn-settings-hide");
        btnGraveSettingshide.on("click", async function() {
            grave.relationship.hide();
            graveInfo.show();

            $("#btn-grave-settings").show();
            $("#btn-grave-edit").show();
        });
        $("#btn-grave-settings").show();
    } else {
        $("#btn-grave-settings").hide();
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
    $("#deads-message-container").show();

    selectedGrave = fromAccount;
    heritageGrave = await callGrave(fromAccount);
    var position = heritageGrave.getPosition();
    $("#input-claim-heritage-lat").val(heritageGrave.getLatitude(position));
    $("#input-claim-heritage-lng").val(heritageGrave.getLongitude(position));

    var encryptedAES = heritageGrave.getText();
    var text = CryptoJS.AES.decrypt(encryptedAES, heritageGrave.getHeritage()).toString(CryptoJS.enc.Utf8);
    if (text != "") $("#deads-message").text(text);
    else $("#deads-message-container").hide();

    $("#btn-grave-claim-heritage").show();
    $("#input-claim-heritage-dob").datepicker({ dateFormat: 'dd.mm.yy' });
    $("#btn-grave-claim-heritage").on("click", async function() {
        $("#btn-grave-claim-heritage").hide();
        $("#map-grave").show();
        $("#container-grave-relationship").hide();
        $("#container-gifts").hide();
        graveInfo.hide();

        grave.heritage.show(function() {
            $("#btn-grave-claim-heritage").show();
            $("#map-grave").hide();
            $("#container-grave-relationship").show();
            $("#container-gifts").show();
            graveInfo.show();
        });
    });
}

async function claimHeritage(grave) {
    $("#btn-claim-heritage-hide").click();
    var position = $("#input-claim-heritage-lat").val() + "," + $("#input-claim-heritage-lng").val();
    var stoneText = $("#input-claim-heritag-grave-text").val();
    await graveyard.methods.claimHeritage(grave, $("#input-claim-heritage-dob").val(), stoneText, position).send({ from: selectedAccount });
    initGrave(selectedGrave);
}

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

function checkAlive(checked) {
    if (checked) {
        $("#create-grave-dod").hide();
        $("#lbl-create-grave-dod").hide();
        $("#grave-positioning").hide();
        $("#container-gifts").hide();
        $("#create-grave-heritage-message-container").show();
        $("#create-grave-text-container").hide();

        tempDod = $("#create-grave-dod").val();
        $("#create-grave-dod").val(aliveDod);
        tempLat = $("#create-grave-pos-lat").val();
        tempLng = $("#create-grave-pos-lng").val();
        $("#create-grave-pos-lat").val("0");
        $("#create-grave-pos-lng").val("0");

        aliveUncheckedText = $("#create-grave-text").val();
        $("#create-grave-text").val(aliveCheckedText);
    } else {
        $("#create-grave-pos-lat").val(tempLat);
        $("#create-grave-pos-lng").val(tempLng);
        tempLat = "0";
        tempLng = "0";
        if(tempDod != aliveDod) $("#create-grave-dod").val(tempDod);
        tempDod = aliveDod;
        $("#create-grave-dod").show();
        $("#lbl-create-grave-dod").show();
        $("#grave-positioning").show();
        $("#container-gifts").show()
        $("#create-grave-heritage-message-container").hide();
        $("#create-grave-text-container").show();
        aliveCheckedText = $("#create-grave-text").val();
        $("#create-grave-text").val(aliveUncheckedText);
    }
}

var graveInfo = {
    onHide: null,

    show: function(callback) {
        this.onHide = callback;
        $("#container-grave-relationship").show();
        $("#container-grave-image").show();
        $("#container-grave-name").show();
        $("#container-grave-date").show();
        $("#container-grave-text").show();
    },
    hide: function() {
        if (this.onHide != null) this.onHide();
        $("#container-grave-relationship").hide();
        $("#container-grave-image").hide();
        $("#container-grave-name").hide();
        $("#container-grave-date").hide();
        $("#container-grave-text").hide();
    }
}

var grave = grave || {};
 grave.empty = {
    show: function() {
        $("#no-grave").show();
    },

    hide: function() {
        $("#no-grave").hide();
    }
}

grave.create = {
    onHide: null,

    view: $("#grave-create"),
    show: function(callback) {
        this.onHide = callback;
        $("#create-grave-dob").datepicker({ dateFormat: 'dd.mm.yy' });
        $("#create-grave-dod").datepicker({ dateFormat: 'dd.mm.yy' });
        if (this.view.is(":hidden")) {
            this.view.show();
        }

        checkAlive($(".chk-alive").prop("checked"));
        $(".chk-alive").change(function() {
            checkAlive(this.checked);
        });
    
        $("#btnCreateDo").click(function() {
            createNewGrave();
        });
    
        $("#btnCreateReset").click(function() {
            grave.create.reset();
        });
    
        $("#btnCreateClose").click(function() {
            grave.create.hide();
        });
    },

    reset: function() {
        resetUpload();
        $("#input-upload-portrait").val("");
        $("#input-upload-background").val("");
        $("#create-grave-name").val("");
        $("#create-grave-dob").val("");
        $("#create-grave-dod").val("");
        $("#create-grave-text").val("");
        $("#create-grave-pos-lat").val("");
        $("#create-grave-pos-lng").val("");
    },

    hide: function() {
        if (this.onHide != null) this.onHide();
        this.view.hide();
    }
}

grave.heritage = {
    onHide: null,
    view: $(""),

    show: function(callback) {
        this.onHide = callback;
        this.view.show();

        $("btn-claim-heritage-close").click(function() {
            grave.heritage.hide();
        });
    },

    hide: function() {
        if (this.onHide != null) this.onHide();
        this.view.hide();
    }
}

grave.relationship = {
    onHide: null,
    view: $("#grave-relationship"),

    show: function(callback) {
        this.onHide = callback;
        this.view.show();

        $("#btn-settings-close").click(function() {
            grave.relationship.hide();
        });
    },

    reset: function() {

    },

    hide: function() {
        if (this.onHide != null) this.onHide();
        this.view.hide();
    }
}

grave.heritage = {
    onHide: null,
    view: $("#grave-heritage"),

    show: function(callback) {
        this.onHide = callback;
        this.view.show();
    
        $("#btn-claim-heritage-claim").click(async function() {
            grave.heritage.hide();
            claimHeritage(selectedGrave);
        });

        $("#btn-claim-heritage-close").click(function() {
            grave.heritage.hide();
        });
    },

    reset: function() {

    },

    hide: function() {
        if (this.onHide != null) this.onHide();
        this.view.hide();
    }
}