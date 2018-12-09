//Array for topic
var actresses = ["Anna Kendrick", "Rebel Wilson", "Amy Schumer", "Kristen Wigg"];

// Function re-renders the HTML to display the appropriate content
function displayActress() {

    var actress = $(this).attr("data-name");
    console.log(actress)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actress + "&api_key=j6IgvnuhzcCWb5w8XNkFGtnCWBhtKr3x&limit=10";

    // AJAX call for the specific actress button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var { data, meta } = response
        console.log(response);

        // Looping through each result item
        for (var i = 0; i < response.data.length; i++) {

            // Div to hold the actress
            var actressDiv = $("<div class='actress'>");

            var results = response.data;
            var rating = response.Rated;

            // Element to have the rating displayed
            var p = $("<p>").text("Rating: " + results[i].rating);

            var actressImage = $("<img class='picture'>");

            actressImage.attr("src", results[i].images.fixed_height_still.url);

            actressImage.attr('data-still', results[i].images.fixed_height_still.url);
            actressImage.attr('data-state', 'still');
            actressImage.addClass('gif');
            actressImage.attr('data-animate', results[i].images.fixed_height.url);

            // Displaying the rating
            actressDiv.append(p);
            actressDiv.append(actressImage);

            $("#actress-view").prepend(actressDiv);
        }
    });
}

// Function for displaying actress data
function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of actresses
    for (var i = 0; i < actresses.length; i++) {

        // Dynamic buttons for each actress in the array
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

// This function handles events where an actress button is clicked
$("#add-actress").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actress = $("#actress-input").val().trim();

    // Only adds buttons if input field is not blank and topic has not already been added
    if (actress != '' && actresses.indexOf(actress) === -1) {

        // Adding actress from the textbox to our array
        actresses.push(actress);

        // Calling renderButtons which handles the processing of our actress array
        renderButtons();

        // Clears textbox
        $("#actress-input").val('');
    };
});

//Toggle between still and live gif's
$("#actress-view").on("click", ".picture", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var URL = $(this).attr("data-state");

    if (URL == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
})

//Clears all gif's
$(document).on("click", "#clear", function () {

    // Removes all uploaded gifs
    $('#actress-view').empty();

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});
// Adding a click event listener to all elements with a class of "actress-btn"
$(document).on("click", ".actress-btn", displayActress);

// Calling the renderButtons function to display the intial buttons
renderButtons();


