async function callGrave(fromAccount) {
    function Grave(portrait, bg, name, heritage, dob, dod, text, position, lat, lng) {
        this.gravePortrait = portrait;
        this.graveBg = bg;
        this.graveName = name;
        this.graveHeritage = heritage;
        this.graveDob = dob;
        this.graveDod = dod;
        this.graveText = text;
        this.gravePosition = position;
        this.graveLat = lat;
        this.graveLng = lng;

        this.getPortrait = function() {
            return this.gravePortrait;
        }

        this.getBackground = function() {
            return this.graveBg;
        }

        this.getName = function() {
            return this.graveName;
        }

        this.getHeritage = function() {
            return this.graveHeritage;
        }

        this.getBirth = function() {
            return this.graveDob;
        }

        this.getDeath = function() {
            return this.graveDod;
        }

        this.getText = function() {
            return this.graveText;
        }

        this.getPosition = function() {
            return this.gravePosition;
        }

        this.getLatitude = function() {
            return this.graveLat;
        }

        this.getLongitude = function() {
            return this.graveLng;
        }
    }

    if (fromAccount) {
        var resultV2 = await graveyardV2.methods.getGrave(fromAccount).call();

        var grave = new Grave(resultV2[0].split("<||>")[0], resultV2[0].split("<||>")[1], resultV2[1], resultV2[2], resultV2[3], resultV2[4], resultV2[5], resultV2[6], resultV2[6].split(",")[0], resultV2[6].split(",")[1]);
        if (grave.getName() == "" && grave.getBirth() == "") {
            var resultV1 = await graveyard.methods.getGrave(fromAccount).call();
            grave = new Grave(resultV1[0], resultV1[1], resultV1[2], "", resultV1[3], resultV1[4], resultV1[5], resultV1[6], resultV1[6].split(",")[0], resultV1[6].split(",")[1]);
        }

        return grave;
    }

}