var giphy = "https://api.giphy.com/v1/gifs/";
var search = "search?q=";
var limit = "&limit=12";
var key = "&api_key=olNnoonalFjTJ2xzZ9ovXi3RJQTHayOW";

var topics = ["Fire Emblem", "Animal Crossing", "Paper Mario", "Pokemon", "Splatoon", "Bayonetta"];

function tagDisplay() {
    $(".tags").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttonContainer = $("<div>").addClass("gif-tags");
        var tag = $("<p>").addClass("gif-button").attr("data-name", topics[i]).text(topics[i]);
        buttonContainer.append(tag);
        $(".tags").append(buttonContainer);
    }
}
tagDisplay();

function onLoadDisplay() {
    var activeElement = $("p[data-name='" + topics[1] + "']");
    tagActive(activeElement);
    ajaxCall(topics[1]);
}
onLoadDisplay();

function gifButton() {
    //give gif buttons a data-name
    var button = $(this).attr("data-name");
    //clear active classes when clicking on a new button
    $("p").removeClass("active");
    $(".selector").remove();
    //add active classes
    tagActive(this);
    //call ajax for when button is clicked
    ajaxCall(button);
}

function tagActive(element) {
    var rightArrow = $("<div>").addClass("selector");
    $(element).addClass("active");
    $(element).parent().append(rightArrow);
}

$(".submit").on("click", function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //get input word
    term = $(".input-bar").val();
    //clear input
    $(".input-bar").val("");
    //push search term into array
    topics.push(term);
    ajaxCall(term);
    //display new tag
    tagDisplay();
})

function ajaxCall(input) {
    //clear gifs
    $(".gif-area").empty();
    var queryURL = giphy + search + input + limit + key;
    //making ajax call to get data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var newGameTag = $("<div>").addClass("gif").append("<img src='" + response.data[i].images.fixed_height.url + "'>");
            $(".gif-area").append(newGameTag);
        }
    })
}

$(".tags").on("click", ".gif-button", gifButton);