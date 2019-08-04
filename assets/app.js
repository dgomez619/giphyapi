// API for GIPHY populates page

//buttons array 

console.log("this")

$(document).ready(function(){

    let sports = ["Surf", "Basketball", "Boxing", "Baseball"];

    //function to add them to page

    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();
            console.log("test");
        for (var i = 0; i < arrayToUse.length; i++) {
            
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            console.log(a);
            $(areaToAddTo).append(a);
        }
    }

    //Function that populates images from api

    $("#sport-buttons").on("click", ".sport-button", function(){
        $("#images").empty();

        $(".sport-button").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "http://api.giphy.com/v1.gifs/search?q=" + type + "&api_key=K8DRou9zlvVT6L9uKs3q6nitAl6aEeal";
    
        //Ajax

        $.ajax({
            url: queryURL,
            method: "GET"

        })

        .then(function(response){
            let results = response.data;

            for (var i = 0; i < results.length; i++){
                let sportDiv = $("<div class=\"sport-item\">");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;

                let sportImage = $("<img");
                sportImage.attr("src", sill);
                sportImage.attr("data-still", still);
                sportImage.attr("data-animated", animated);
                sportImage.attr("data-state", "still");
                sportImage.addClass("sport-image")

                sportDiv.append(p);
                sportDiv.append(sportImage);

                $("images").appned(sportImage);


            }
        });

    });

    $("#images").on("click", ".sport-image", function(){
        let state = $(this).attr("data-state");

        if (state === "sitll"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        
        }
    });

    $("#add-sport").on("click", function(event){
        event.preventDefault();
        let newSport = $("input").val();

        if(newSport.length > 2){
            sports.push(newSport);
        }

        populateButtons(sports, "sport-button", "#sport-buttons");
    })

})
