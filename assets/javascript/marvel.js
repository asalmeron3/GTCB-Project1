// This is javascript related to Marvel API
var apiKey = "4ca284a4ce90a4d302b4c5d0aa34bc15";
var privateKey = "a9364c43108188a0d1fbeff389ab08e0ae2e9c36";
var ts = moment.utc().format("x").toString();
var passhash = CryptoJS.MD5(ts + privateKey + apiKey);
console.log(ts);

$(document).ready(function() {

    var createDiv = $('<div class= "character">');
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=Misty%20Knight&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var name = response.data.results["0"].name;
        var thumbnail = response.data.results["0"].thumbnail.path;
        var stories = response.data.results["0"].stories.collectionURI;

        var p = $("<p>");
        p.append(name);
        p.append(stories);

        var img = $("<img>").attr("src", thumbnail + ".jpg");
        p.append(img);
        createDiv.append(p);
        $("body").append(createDiv);
    });
});