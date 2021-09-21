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
        var result = await graveyard.methods.getGrave(fromAccount).call();

        var grave = new Grave(result[0].split("<||>")[0], result[0].split("<||>")[1], result[1], result[2], result[3], result[4], result[5], result[6], result[6].split(",")[0], result[6].split(",")[1]);

        return grave;
    }

}