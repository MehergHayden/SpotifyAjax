(function() {
//set variables
var URL;
var data;
var input;
var Artist;
$("select").val();

//getData function to store the user input and set/get the data we want to retrieve as an artist.
function getData() {
  input = $("input[name='Artist']").val();
  Artist = $("select").val();
  data = {
      q: input,
      type: Artist
  };
}

//startSearch function - removes the previous search, getData for new result, and display getResponse
function startSearch() {
  $(".result").remove();
  getData();
  //bypass authentication url. Pass query string parameters that pass to spotifys endpoints.
  //API proxy spotify endpoints to make api access easier. Lightweight, simple API Gateway
  getResponse("https://elegant-croissant.glitch.me/spotify", data);
}

//getResponse makes an AJAX request to retrive the artist and Image link
//URL will make a request to the Spotify search API with the parameters you specify,
//and send back the exact JSON that Spotify responds with.
function getResponse(url, data) {
  $.ajax({
      url: url,
      method: "GET",
      data: data,
      success: function(response) {
          response = response.artists;
          var html = "";
            for (var i = 0; i < response.items.length; i++) {
                var imageUrl = "default.jpg";
                if (response.items[i].images[0]) {
                    imageUrl = response.items[i].images[0].url;
                }
                html +=
                    "<div class='result'><a href='" +
                    response.items[i].external_urls.spotify +
                    "' target='_blank'><img class='imgResult' src='" +
                    imageUrl +
                    "'></a><div class='responseName'><p>" +
                    response.items[i].name +
                    "</p></div></div>";
                URL =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                  }
                $("#results").append(html);
              },
                error: function(error) {
                alert("ERROR: ", error);
              }
            });
          }

$("#submit-btn").on("click", function() {
  $("#Result").remove();
  startSearch();
});

$("#next-btn").on("click", function() {
  $("#Result").remove();
  getData();
  getResponse(URL);
});
})();
