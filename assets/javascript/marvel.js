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
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=Spider-Man&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash + "&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var name = response.data.results["0"].name;
        var thumbnail = response.data.results["0"].thumbnail.path;
        var story = response.data.results["0"].description;
        var comic = response.data.results["0"].comics.items["0"].name;
        var characterId = response.data.results["0"].id;
        var p = $("<p>");
        p.append(name);
        p.append(story);
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
            console.log(firstComicImage);
            var firstComicTitle = secondResponse.data.results['0'].title;
            var secondComicImage = secondResponse.data.results['1'].thumbnail.path;
            var secondComicTitle = secondResponse.data.results['1'].title;
            var thirdComicImage = secondResponse.data.results['2'].thumbnail.path;
            var thirdComicTitle = secondResponse.data.results['2'].title;
            var fourthComicImage = secondResponse.data.results['3'].thumbnail.path;
            var fourthComicTitle = secondResponse.data.results['3'].title;

            var innerDiv = $("<div>");
            var pTwo = $("<p>");
            for (var x = 0; x < 4; x++) {
                var comicImage = secondResponse.data.results[x].thumbnail.path;
                console.log(comicImage);
                var comicTitle = secondResponse.data.results[x].title;
                var innerImg = $("<img>").attr("src", comicImage + ".jpg");
                innerDiv.append(innerImg);
                p.append(comicTitle);
                innerDiv.append(p);
            }

            createDiv.append(innerDiv);



            $("body").append(createDiv);

        });
    });

});