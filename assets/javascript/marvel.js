// This is javascript related to Marvel API
var apiKey = config.PUBLIC_KEY;
var privateKey = config.PRIVATE_KEY;
var ts = moment.utc().format("x").toString();
var passhash = CryptoJS.MD5(ts + privateKey + apiKey);


//for names with spaces we need to do a string replace to return a correct result
function displayMarvelCharacter(nameMatch) {
    var createDiv = $('<div class= "character">');
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=" + nameMatch + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash + "&limit=5";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
        
    }).done(function(response) {
        console.log(response);
        var name = response.data.results["0"].name;
        var thumbnail = response.data.results["0"].thumbnail.path;
        var story = response.data.results["0"].description;
        var charStats = response.data.results["0"].urls[0].url;
            if (story==""){
                story = "A description is not available for this character :( ";
            }
        var comic = response.data.results["0"].comics.items["0"].name;
        var characterId = response.data.results["0"].id;
        var p = $("<p>");
        //p.append(name);
        //p.append(story);
        var img = $("<img>").attr("src", thumbnail + ".jpg");
        //p.append(img);
        //createDiv.append(p);
        var NameUnderPic = $("<div>");
        NameUnderPic.html("<a href='"+ charStats+ "' target = '_blank'>" +"<h2>"+ name+"</h2>" +"</a>");
        // $("#character-name").;
        $("#backgroundStory").html(story);
        $("#cpic").append(img).append(NameUnderPic);
        //$("body").append(createDiv);
        var comicURL = "https://gateway.marvel.com:443/v1/public/characters/" + characterId + "/comics?limit=8&ts=" + ts + "&apikey=" + apiKey + "&hash=" + passhash;
        $.ajax({
            url: comicURL,
            method: "GET"

        }).done(function(secondResponse) {
            console.log(secondResponse);
            // var innerDiv = $("<div>");
            // var pTwo = $("<p>");
            for (var x = 0; x < 8; x++) {
                var innerDiv = $("<div>");
                var pTwo = $("<p>");
                var pSummary = $("<p>");
                var hyperLink =secondResponse.data.results[x].urls[0].url;
                var comicImage = secondResponse.data.results[x].thumbnail.path;
                //console.log(comicImage);
                var comicTitle = secondResponse.data.results[x].title;
                var summary = secondResponse.data.results[x].description;
                // var innerImg = $("<img>").attr("src", comicImage + ".jpg");
                innerDiv.html("<a href ='" + hyperLink + "' target = '_blank'><img src='"+ comicImage + ".jpg'" +"></a>" );

                // innerDiv.append(innerImg);
                pTwo.append(comicTitle);
                pSummary.append(summary);
                innerDiv.append(pTwo);
                innerDiv.append(pSummary);
                innerDiv.attr("id", "comicBook");
                $("#comic-images").append(innerDiv);

            }

            // $("#comic-images").append(innerDiv);



            //$("body").append(createDiv);

        });
    });
}