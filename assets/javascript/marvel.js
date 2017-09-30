// This is javascript related to Marvel API
var apiKey = config.PUBLIC_KEY;
var privateKey = config.PRIVATE_KEY;
var ts = moment.utc().format("x").toString();
var passhash = CryptoJS.MD5(ts + privateKey + apiKey);

var config = {
    apiKey: "AIzaSyCDLilBeBhqY-Xv4S3vDQYZJ-PAxfsqSLg",
    authDomain: "marvel-characters-7bde8.firebaseapp.com",
    databaseURL: "https://marvel-characters-7bde8.firebaseio.com",
    projectId: "marvel-characters-7bde8",
    storageBucket: "",
    messagingSenderId: "496003755624"
};
firebase.initializeApp(config);


$(document).ready(function() {

    var createDiv = $('<div class= "character">');
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=Misty%20Knight&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash + "&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //console.log(response);
        var name = response.data.results["0"].name;
        var thumbnail = response.data.results["0"].thumbnail.path;
        var stories = response.data.results["0"].stories.collectionURI;
        var comic = response.data.results["0"].comics.items["0"].name;
        var characterId = response.data.results["0"].id;
        var p = $("<p>");
        p.append(name);
        p.append(stories);
        var img = $("<img>").attr("src", thumbnail + ".jpg");
        p.append(img);
        createDiv.append(p);
        $("body").append(createDiv);
        var comicURL = "https://gateway.marvel.com:443/v1/public/characters/" + characterId + "/comics?limit=4&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash;
        $.ajax({
            url: comicURL,
            method: "GET"
        }).done(function(secondResponse) {
            console.log(secondResponse);
            var firstComicImage = secondResponse.data.results['0'].thumbnail.path;
            var firstComicTitle = secondResponse.data.results['0'].title;
            var secondComicImage = secondResponse.data.results['1'].thumbnail.path;
            var secondComicTitle = secondResponse.data.results['1'].title;
            var thirdComicImage = secondResponse.data.results['2'].thumbnail.path;
            var thirdComicTitle = secondResponse.data.results['2'].title;
            var fourthComicImage = secondResponse.data.results['3'].thumbnail.path;
            var fourthComicTitle = secondResponse.data.results['3'].title;

            var innerDiv = $("<div>");
            var innerImg = $("<img>").attr("src", firstComicImage + ".jpg");
            var pTwo = $("<p>");
            createDiv.append(innerDiv);
            innerDiv.append(innerImg);
            p.append(firstComicTitle);
            innerDiv.append(p);

            $("body").append(createDiv);

        });
    });

});