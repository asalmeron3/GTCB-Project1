
$('.hide2').css("display", "none");


// $("#submit").on("click", function(){

	// $('.hide1').css("display", "none");
	// $('.hide2').css("display", "inline");

// });

$('#try').on("click",function(){

	$('.hide2').css("display", "none");
	$('.hide1').css('display',"inline");
    $("#upic").empty();
    $("#cpic").empty();
    $("#comic-images").empty();

})

// $j(function(){          
//     $j('#add').click(function(e){ 
//         e.preventDefault();            
//         $j("input:file").click();              
//         var ext = $j("input:file").val().split(".").pop().toLowerCase(); 
//         if($j.inArray(ext, ["gif","png","jpg","jpeg"]) == -1) { 
//         alert("gif,png,jpg 파일만 업로드 할수 있습니다."); 
//         return false;  
//         }                              
//         $j("input:file").val().toLowerCase(); 
//     });                        
// });                    