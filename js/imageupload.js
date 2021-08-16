const PORTRAIT = "portrait";
const BACKGROUND = "background";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2NzFhNzJCRDMxOWQ3YzgwRmQzOWRENmFFZDg2RTc3OWY1NDkyMDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjg0NTA0Mzg1NCwibmFtZSI6ImluZXRoIn0.gENEQvtPkWgpeFMpwUFjsWvvahhEutvAaCuz7ZP7h7M";
const urlNftStorage = "https://api.nft.storage/upload";

$("#btn-upload-portrait").on("click", function() {
    doUploadImage("portrait");
});

$("#btn-upload-background").on("click", function() {
    doUploadImage("background");
});

function doUploadImage(expr) {
    if (expr == PORTRAIT || expr == BACKGROUND) {
        input = "input-upload-" + expr;
        output = "output-upload-" + expr;
        label = "label-upload-" + expr;
        btn = "btn-upload-" + expr;
        img = "img-upload-loading-" + expr;
        error = "upload-error-" + expr;

        fieldInput = document.getElementById(input);
        fieldOutput = document.getElementById(output);
        fieldLabel = document.getElementById(label);

        //$("#" + btn).hide();
        $("#" + img).show();

        var customXMLHttpRequest = (function(jwtoken) {
            function getXMLHttpRequest(method, url, async) {
                var xmlHttpRequest = new XMLHttpRequest();
                xmlHttpRequest.open(method, url, async);
                xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
                return xmlHttpRequest;
            }

            return getXMLHttpRequest;
        })(key);

        var xmlHttpRequest = customXMLHttpRequest('POST', urlNftStorage, true);
        xmlHttpRequest.onload = function(oEvent) {
            // Uploaded.
            const data = JSON.parse(xmlHttpRequest.responseText);
            try {
                var cid = data.value.cid;
                url = "https://" + cid + ".ipfs.dweb.link/";
                fieldOutput.value = url;
                $("#" + output).show();
                $("#" + label).show();
                $("#" + input).hide();
                $("#" + btn).show();
                $("#" + img).hide();
                $("#" + error).hide();
            } catch (e) {
                $("#" + output).hide();
                $("#" + label).show();
                $("#" + input).show();
                $("#" + btn).show();
                $("#" + img).hide();
                $("#" + error).show();
            }
        };

        try {
            const f = fieldInput.files[0];
            //var blob = new Blob(formData);
            xmlHttpRequest.send(f);
        } catch (e) {
            $("#" + error).show();
        }
    }

}

$("#input-upload-portrait").show();
$("#output-upload-portrait").hide();
$("#label-upload-portrait").show();

$("#input-upload-background").show();
$("#output-upload-background").hide();
$("#label-upload-background").show();