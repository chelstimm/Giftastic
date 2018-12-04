//Array for topic
var actresses = ["Anna Kendrick", "Rebel Wilson", "Amy Schumer", "Kristen Wigg"];

// displayActressInfo function re-renders the HTML to display the appropriate content
function displayActress() {

    var actress = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actress + "&api_key=j6IgvnuhzcCWb5w8XNkFGtnCWBhtKr3x";

    // Creating an AJAX call for the specific actress button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // var results = response.data;

        // Creating a div to hold the actress
        var actressDiv = $("<div class='actress'>");

        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        actressDiv.append(pOne);

        // Putting the entire movie above the previous movies
        $("#actress-view").prepend(actressDiv);
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
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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

// Adding a click event listener to all elements with a class of "actress-btn"
$(document).on("click", ".actress-btn", displayActress);
// Calling the renderButtons function to display the intial buttons
renderButtons();