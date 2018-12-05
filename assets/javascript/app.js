//Array for topic
var actresses = ["Anna Kendrick", "Rebel Wilson", "Amy Schumer", "Kristen Wigg"];

// displayActressInfo function re-renders the HTML to display the appropriate content
function displayActress() {

    var actress = $(this).attr("data-name");
    // var api_key = "j6IgvnuhzcCWb5w8XNkFGtnCWBhtKr3x";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actress + "&api_key=j6IgvnuhzcCWb5w8XNkFGtnCWBhtKr3x&limit=10";

    // Creating an AJAX call for the specific actress button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        // Looping through each result item
        for (var i = 0; i < actresses.length; i++) {

            // Creating a div to hold the actress
            var actressDiv = $("<div class='actress'>");

            var results = response.data;
            var rating = response.Rated;

            // Creating an element to have the rating displayed
            var p = $("<p>").text("Rating: " + results[i].rating);

            var actressImage = $("<img>");
            actressImage.attr("src", results[i].images.fixed_height_still.url);

            actressImage.attr('data-still', results[i].images.fixed_height_still.url);
            actressImage.attr('data-state', 'still');
            actressImage.addClass('gif');
            actressImage.attr('data-animate', results[i].images.fixed_height.url);

            // Displaying the rating
            actressDiv.append(p);
            actressDiv.append(actressImage);

            // Putting the entire movie above the previous movies
            $("#actress-view").prepend(actressDiv);
        }
    });
}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < actresses.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        var a = $("<button>");
        // Adding a class of actress-btn to our button
        a.addClass("actress-btn");
        // Adding a data-attribute
        a.attr("data-name", actresses[i]);
        // Providing the initial button text
        a.text(actresses[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-actress").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actress = $("#actress-input").val().trim();

    // Adding movie from the textbox to our array
    actresses.push(actress);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

//Toggle between still and live gif's
$(document).on("click", "#actress-view", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var URL = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
		if ( URL == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
        })
// Adding a click event listener to all elements with a class of "actress-btn"
$(document).on("click", ".actress-btn", displayActress);

// Calling the renderButtons function to display the intial buttons
renderButtons();
