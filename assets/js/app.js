
var cars = ["Paul Walker", "Hyundai Genesis Coupe", "Nissan 240sx", "Toyota AE86", "Nissan 350z", "Nissan GTR", "Mitsubishi Eclipse", "Mitsubishi Evo", "Ford Mustang"];


function makeButtons(){ 
	
	$('#buttonsView').empty();
	
	for (var i = 0; i < cars.length; i++){
		
		var a = $('<button>') 
		a.addClass('car'); 
		a.attr('data-name', cars[i]); 
		a.text(cars[i]); 
		$('#buttonsView').append("  ", a); 
	}
}


$("#dropIn").on("click", function(){

	var car = $("#cars").val().trim();
	cars.push(car);
	makeButtons();
	return false; 
	
	if (car == "") {
	alert("empty");
	}
	return;

})


function displayGifs(){
	var car = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&limit=9&api_key=dc6zaTOxFJmzC";

		
	$.ajax({url: queryURL, method: "GET"}).done(function (response) {
						
		var results = response.data;
			
		for (var i = 0; i < results.length; i++) {
				
			var gifDiv = $('<div class=gifs>');
			var carGifs = $('<img>');
				carGifs.attr('src', results[i].images.fixed_height_still.url);
					
				carGifs.attr('title', "Rating: " + results[i].rating);
				carGifs.attr('data-still', results[i].images.fixed_height_still.url);
				carGifs.attr('data-state', 'still');
				carGifs.addClass('gif');
				carGifs.attr('data-animate', results[i].images.fixed_height.url);

				gifDiv.append(carGifs)
				
				$("#gifs").prepend(gifDiv);
			}			
		});
}


$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});




$(document).on("click", ".car", displayGifs);

makeButtons();