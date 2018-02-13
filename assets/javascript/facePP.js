// This is javascript related to Face++ API

//---------Initialize your Firebase Database -----------------//
	
	// The configuration/info needed to access the database  if FireBase
	var config = {
	    apiKey: "AIzaSyBKObLegkFydR8SnH6RuozzY6Il8iJYWCc",
	    authDomain: "gtcbproj1.firebaseapp.com",
	    databaseURL: "https://gtcbproj1.firebaseio.com",
	    projectId: "gtcbproj1",
	    storageBucket: "gtcbproj1.appspot.com",
	    messagingSenderId: "793915766850"
	};
 
	//Initialize the FireBase Application
	firebase.initializeApp(config);
 
 	// a varible to reference the entire database stored in FireBase
	var heroData = firebase.database();
//___________________________________________________________//



//-----------------Face++ API Info -------------------------//

	var analyzeLink = "https://api-us.faceplusplus.com/facepp/v3/face/analyze?";
	var detectLink = "https://api-us.faceplusplus.com/facepp/v3/detect?"

	var API_KEY = "E3RSc9g4hOdNXNi3wuLJsy1Qkw0RGKMl";
	var API_SECRET = "u5VWJDR0NLRSWySPsRT8zYar6HHfVzKe";
//___________________________________________________________//



//-------The Marvel Character We Have Matched To User---------//

	var MarvelCharMatch = "BatMan";
		// You can never be BatMan, but we'll let be you 
		// be him here...yes WE KNOW that's a DC Character
//___________________________________________________________//

var dataurl;
var file;
var file2;
var userPhoto;

$(document).ready(function(){

	//-------------Once the user has Submitted A Photo-----------//

		$("#submit").on("click",function(event){
			
			//Prevent the page from refreshing
			event.preventDefault();

			// Get the LIST of files that user has submitted
			var userUpload = document.getElementById("testingPhoto").files;

			// Using the first (and only) file in the list, check if ...

			//--------If the user did NOT upload a file ----------//
				if ( userUpload[0] == undefined) {
					
					//Let the user know (via MODAL) to go back and submit a file
					// alert("You Have Not Submitted a photo. Please submit a JPG photo");
					dispModal("Please Upload a Picture. Submit a JPG, JPEG, or PNG file only.");
				}//end of first condition under "button"
			//__________________________________________________//



			//----If the user did submit a file, check the file type----//

				else if (!userUpload[0].name.match(/.(jpg|jpeg|png)$/i)){
					
					//Let the user know (via MODAL) to go back and submit a file	
					// alert('not an image');
					dispModal("This file is not acceptable. Submit a JPG, JPEG, or PNG file only.");
				} // end of second condition under "button"
		   	//__________________________________________________//


		   	// //If the user submitted an acceptable file type -----//
				else {
					$("#testingPhoto").ready(ResizeImage(userUpload));

				


					
				}// End of ELSE (from clicking submit)
			// end of comment before ELSE//
		}); // End of the user click
	// end of comment before user click
});	//End of (document).ready()//

function ResizeImage(userUpload) {
	var files = userUpload
     file = files[0];

    // Create an image
    var img = document.createElement("img");
    // Create a file reader
    var reader = new FileReader();
    // Set the image once loaded into file reader
    reader.onload = function(e) {
            img.src = e.target.result;
            userPhoto = $("<img>");
            userPhoto.attr("src", e.target.result);

            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 400;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            dataurl = canvas.toDataURL("image/png"); 
            // dataurl = encodeURIComponent(dataurl);
            // var dataurl2 = dataurl.split("data:image/jpeg;base64,")[1]; 
            // dataurl = dataurl2;
            file2 = new FormData();

			//append the name of the parameter "image_file" to your binary data
			file2.append("image_file", dataURItoBlob(dataurl));
    		fppDetect();
        }
        // Load files into file reader
    reader.readAsDataURL(file);
  
}
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});
}
function fppDetect()  {
	//----------the FIRST API Request for FACE++------///

						//compose the URL for ajax to request api data from FACE++. "Detect" will find
						//the face and assign that face a "token". The token is needed to later analyze
						var queryURL = detectLink+ "api_secret=" + API_SECRET+ "&api_key="+API_KEY;
						console.log(queryURL)
						//Configure your First Ajax request
						$.ajax({

							//provide the url for your request
						    url: queryURL,

						    //state the type of request. For Face++, the type is "POST"
						    type: 'POST',
						    statusCode: {
        						400: function() {
						         	console.log("We could not detect your face. Please try another photo.")
						        }
						    },

						    //prevent JAVASCRIPT from trying to find the contentType and from processingData on the file
						    contentType: false,
						    processData: false,
						    //give your ajax request data it needs in order to fulfill the request for Face++ ...
						    //the "data" is the image the use uploaded with the "image_file" parameter included
						    data:  file2

							}).done(function(response){
								//Upon getting your first request from Face++, prepare to make a SECOND request...
								 // using the unique "face_token" created in the first request. 

								if (response.faces[0] == undefined) {
									var say = "This Photo is not Superhero worthy! Please try a different photo.";
									console.log(say);
								}

								else{
									// find/obtain/store the the token from the RESPONSE of your Detect-Ajax call
									var token = response.faces[0].face_token;

									//Prepare a different URL for the ajax call. This link will ANALYZE the face of the image...
									//The image CANNOT be a file. It specifically has to be the UNIQUE TOKEN generated from the DETECT request					
									var queryURL2 = analyzeLink+ "api_secret=" + API_SECRET+ "&api_key="+API_KEY + "&face_tokens="+token;

									//To the URL, add the parameter "return_landmark=1". Face++ needs this to analyze appropriately
									//Also add the parameter "return_attributes" to get facial info on age, gender, emotion, and smiling 
									var features ="&return_landmark=1&return_attributes=gender,age,smiling,emotion"; 

									//add the features to the URL
									queryURL2 = queryURL2 + features;
									console.log(queryURL2);
									
									$.ajax({

									    url: queryURL2,
									    type: 'POST',
									    statusCode: {
			        						400: function() {
									         	dispModal("We could not analyze your face. Please try another photo.")
									        }
									    }
																			  
										}).done(function(response2){

											//Make an array of strings of the seven (7) emotions Face++ Rates. This is for indexing later
											var potentialEmotions = ["anger", "disgust","fear","happiness","neutral","sadness", "surprise"];

											// Obtain/store the object of emotions that was sent back (from the 2nd request)
											var emotions = response2.faces[0].attributes.emotion;

											//Prepare Two Variables: One for the strongest emotion and One for that emotions Rating/Percentage
											//Both of these variables will be used for matching the User's face to a Marvel Character
											var emotionToMatch = "tired";
											var numToMatch = 0; // <-- 0% tired? ... this may be a lie


											// LOOP through the list of 7 possible emotions. Use the emotion to INDEX your Object of ...
											// emotions ( from the 2nd response) and obtain the values of each emotion
											for (i=0; i < potentialEmotions.length ; i++){

												//Define the current emotion at the current index
												var currentEmo = potentialEmotions[i];

												// Check your EmotionObject for an emotion that has a higher value than the current rating
												if (numToMatch <emotions[currentEmo]) {

													// Update "numToMatch" to be the value of your higher rated emotion (rounded down)
													numToMatch = Math.floor(emotions[currentEmo]);

													// Update "emotionToMatch" to be the higher rated emotion
													emotionToMatch = currentEmo;

												} //end of "numToMatch" If

											} //end of "potentialEmotions" FOR loop


											//make a object that includes the user's Highest Rated Emotion and the Rating
											var theUser = {
												Emotion: emotionToMatch,
												EmoRate: numToMatch,
											};


											// Add this User's Info to your database user the key "UserInfo"
											heroData.ref("UserInfo/").set(theUser);


											// Tell your database to run the functions "gotData" and "errData" when a value ...
											//is changed in the database. In this case, everytime the user's info is added.
											// The Key/reference where the MarvelCharacter are is in "MarvelChar"
											heroData.ref("MarvelChar").on("value",gotData,errData);



											//-------A Function that returns the Marvel Character from the Database----//

												function gotData(data){

													//Get the Data stored in "MarvelChar"
													var allDataObj = data.val();

													//Get all the KEYS in "MarvelChar"
													var theKeys = Object.keys(allDataObj);

													// Define 2 arrays to store the Names and EmotionRating of Characters
													// that match the user's emotion
													var theMatchesNames = [];
													var theMatchesEmoRate = [];

													//Make a function to loop throught the database and return all characters that share the user's strongest emotion
													
														function matchNamesEmos(theKeys){
															// LOOP through all the keys in "MarvelChar"
															for (k =0; k < theKeys.length; k++){

																// define the current key at the index
																var aSingleKey = theKeys[k];

																//Define the emotion at each key/character
																var emotionInFB = allDataObj[aSingleKey].Emotion;

																// If the emotion at the key/character, matches the user's emotion...
																if (emotionInFB ==emotionToMatch){

																	// store the name of the character in "theMatchesNames" ...
																	theMatchesNames.push(allDataObj[aSingleKey].Name);

																	// and store the emotionRating in the "theMatchesEmoRate"
																	theMatchesEmoRate.push(allDataObj[aSingleKey].EmoRate);

																} //end of IF

															} // end of FOR
														} //end of matchNamesEmos();

														// Run the function using the Keys from the database
															matchNamesEmos(theKeys);

															//If no matches were found, randomly select an emotion for the user and find another match
															if (theMatchesNames.length ==0){
																emotionToMatch = potentialEmotions[Math.floor(Math.random()*8)];
																matchNamesEmos(theKeys);
															} //end of If
														// 
													//End of finding a character

													// Get the Index of the closest character match using "closestMatch"
													// the inputs should be the user's emotion-rating ("numToMatch")
													// and the array of Marvel Characters' emotion ratings "theMatchesEmoRate"
													var theMatchIndex = closestMatch(numToMatch,theMatchesEmoRate);

													// The Name of the closest matching character (use the index)
													MarvelCharMatch = theMatchesNames[theMatchIndex];

													console.log('YOUR MATCH IS: ');
													console.log(MarvelCharMatch);
													displayMarvelCharacter(MarvelCharMatch);

													//--------------Hide the "First Page" ---------//
														$('.hide1').css("display", "none");
														$('.hide2').css("display", "inline");
														$("#upic").html(userPhoto);
													//____________________________________________//

												} // end of gotData()
											//______________________________________________________________________//


											// ------A function that returns an INDEX of the closest match---//

												//inputs: 1) a single number 2) an array of numbers
									            function closestMatch (num, arrOfNums) {

									            	// Store the first number of the array
									                var currentMatch = arrOfNums[0];

									                // Find/Store the absolute-difference in first number in the array and the first input
									                var diffInCurrentNum = Math.abs (num - currentMatch);

									                // Store the current index --> 0
									                var indexOfMatch = 0;

									                // LOOP throught the array of numbers
									                for (j = 0; j < arrOfNums.length; j++) {

									                	// store the absolute-difference between the first input an the next # in the array
									                    var nextNumDiff = Math.abs (num - arrOfNums[j]);

									                    //check to see if the current/next diffrence is less, if so...
									                    if (nextNumDiff < diffInCurrentNum) {

									                    	//update diffInCurrentNum (this should be smaller/closer matching)
									                        diffInCurrentNum = nextNumDiff;

									                       // Update your Index
									                        indexOfMatch = j;

									                    } //end of IF

									                } // end of FOR

									                // RETURN the index --> Used to index the Marvel Character's Name
									                return indexOfMatch;

									            } //end of closestMatch()
									        //___________________________________________________________//

											
									        // ------------A function that returns an error-------------//
												function errData(err){
													dispModal("An Error has occurred! Please refresh the page and try again.");
												} //end of errData()
											//__________________________________________________________//
										}) // End of .done(response2)
									// End of second Ajax call
								}// End else (right before 2nd ajax call)
							}) // End of .done(response)	
						// End of first Ajax call
					// end of comment before first Ajax call
					
}
// //----A function takes in a string to display via a modal ----//
// 	function dispModal(messToDisp){

// 		// Get the modal from the HTML doc
// 		var modal = document.getElementById('myModal');

// 		//Update the paragraph in the modal to include the input-string "messToDisp"
// 		$(".TellUser").html(messToDisp);

// 		// Display the entire modal to "block" the DOM
// 		modal.style.display = "block";


// 		// When the user clicks on (x) inside modal-content, close the modal
// 		$(".close").on("click", function() {
// 		    modal.style.display = "none";
// 		})

// 		// When the user clicks anywhere outside of the modal-content, close the modal
// 		$(w ow).on("click",function(event) {
// 		    if (event.target == modal) {
// 		        modal.style.display = "none";
// 		    }
// 		})
// 	} //end of dispModal()
// //_________________________________________________________//


// //---------------------------End of facePP.js----------------------------//


