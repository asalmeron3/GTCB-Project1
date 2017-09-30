// This is javascript related to Face++ API
var analyzeLink = "https://api-us.faceplusplus.com/facepp/v3/face/analyze?";
var detectLink = "https://api-us.faceplusplus.com/facepp/v3/detect?"

var API_KEY = "E3RSc9g4hOdNXNi3wuLJsy1Qkw0RGKMl";
var API_SECRET = "u5VWJDR0NLRSWySPsRT8zYar6HHfVzKe";


//---Once the user have Submitted There Photo...
$("button").on("click",function(event){
	//Prevent the page from refreshing
	event.preventDefault();


//----------------FOR image file---------/
	//Get the file/photo that the user have submitted. We will need to restrict to JPEG files only
	var userUpload = document.getElementById("testingPhoto").files;
	console.log(userUpload);

	// From the file, we only want the binary data located at the first position of the file
	var convertUserUpload = userUpload[0];

	//initialize/creat a variable that will contain form data and ...
	var file = new FormData();

	//append the name of the parameter that the Face++ API needs in order to submit a request
	file.append("image_file", convertUserUpload);
	console.log(file);

	//With your binary-data image, make the QueryURL for the AJAX call. 
	var queryURL = detectLink+ "api_secret=" + API_SECRET+ "&api_key="+API_KEY;
	console.log(queryURL);



//-------the API Request for FACE++------///
	$.ajax({

	    url: queryURL,


	    type: 'POST',
	    //prevent javascript from trying to find the contentType and from processingData
	    contentType: false,
	    processData: false,
	    //give your ajax request the file/image that it needs in order to fulfill the request
	    data:  file

	}).done(function(response){
		//Upon getting your first request from Face++, make a SECOND request using the unique face_token created in the first request
		console.log(response);

		//the token from the first ajax-call
		var token = response.faces[0].face_token;
		console.log(token);

		//make a different QueryLink for the ajax call. This link will analyze the face of the image. The image cannot be a file. It specifically has to be the unique token generated from the first request
		var queryURL2 = analyzeLink+ "api_secret=" + API_SECRET+ "&api_key="+API_KEY + "&face_tokens="+token + "&return_landmark=1&return_attributes=gender,age,smiling,emotion";
		console.log(queryURL2);
		$.ajax({

		    url: queryURL2,
		    type: 'POST'
		  
		}).done(function(response2){
			console.log(response2);

			var emotions = response2.faces[0].attributes.emotion;
			console.log(emotions);

			var age = response2.faces[0].attributes.age.value;
			console.log(age);

			var smileData = response2.faces[0].attributes.smile;
			console.log(smileData);


			//I am testing my branch. Hope this works



		})


	})


	

});