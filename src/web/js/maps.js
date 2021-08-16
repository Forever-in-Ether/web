var mapCreate;
const startLatlng = { lat: 48.390027133583345, lng: 10.876047490598362 };

var mapGrave;
var markersArray = [];

function initMap() {

    mapCreate = new google.maps.Map(document.getElementById("map-create"), {
        zoom: 4,
        center: startLatlng,
    });

    mapGrave = new google.maps.Map(document.getElementById("map-grave"), {
        zoom: 18,
        center: startLatlng,
    });

    mapGrave.addListener("click", (mapsMouseEvent) => {
        $("#input-claim-heritage-lat").val(mapsMouseEvent.latLng.lat);
        $("#input-claim-heritage-lng").val(mapsMouseEvent.latLng.lng);
    });

    initCreate();
}

function initCreate() {
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to set grave position.",
        position: startLatlng,
    });
    markersArray.push(infoWindow);
    infoWindow.open(mapCreate);
    // Configure the click listener.
    mapCreate.addListener("click", (mapsMouseEvent) => {
        $("#create-grave-pos-lat").val(mapsMouseEvent.latLng.lat);
        $("#create-grave-pos-lng").val(mapsMouseEvent.latLng.lng);
    });

    const locationButton = document.createElement("button");
    locationButton.textContent = "Current Location";
    locationButton.classList.add("custom-map-control-button");
    mapCreate.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        gotoCurrentLocation(mapCreate);
    });
}

function gotoCurrentLocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(mapCreate);
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}

function getLatitude(position) {
    try {
        return position.split(",")[0]
    }
    catch(e) {
        return "";
    }
}

function getLongitude(position) {
    try {
        return position.split(",")[1]
    }
    catch(e) {
        return "";
    }
}