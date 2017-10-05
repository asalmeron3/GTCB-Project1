
$('.hide2').css("display", "none");


// $("#submit").on("click", function(){

	// $('.hide1').css("display", "none");
	// $('.hide2').css("display", "inline");

// });

$('#try').on("click",function(){
	$("#upic").empty();
    $("#cpic").empty();
	$('.hide2').css("display", "none");
	$('.hide1').css('display',"inline");
    
    $("#comic-images").empty();
    $(".profile-pic").html("<img src='assets/images/profile.gif'>");

})

$("#testingPhoto").change(function(){
	var userUpload = document.getElementById("testingPhoto").files;
	if (userUpload[0].name.match(/.(jpg|jpeg|png)$/i)){
		var convertUserUpload = userUpload[0];

	// ----------For Displaying on DOM--------//

		//define a variable to create an image
		var userPhoto = $("<img>");

		//read the image-file with a new FileReader
		var reader = new FileReader();

		// Do some magic...
			reader.onload = function(event){
				var source = event.target.result;

				// add the source attribute to the img tag
			userPhoto.attr("src",source);

			}

			reader.readAsDataURL(convertUserUpload);
			$(".profile-pic").html(userPhoto);
	}

	else{
		dispModal("This file is not acceptable. Submit a JPG, JPEG, or PNG file only.");
	}

})