"use strict";

function searchMovie() {
  $(".result").html("");
  $.ajax({
    url: "http:omdbapi.com",
    type: "get",
    datatype: "json",
    data: {
      apikey: "1f13ae4f",
      s: $("#search-input").val()
    },
    success: function success(result) {
      if (result.Response == "True") {
        var movie = result.Search;
        $.each(movie, function (i, data) {
          $(".result").append("\n              <div class=\"col-md-4 \">\n                  <div class=\"card\">\n                      <img src=\"" + data.Poster + "\" class=\"card-img-top\" alt=\"Poster\">\n                      <div class=\"card-body\">\n                      <h5 class=\"card-title\">" + data.Title + "</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">" + data.Year + "</h6>\n                <a href=\"#\" class=\"card-link text-decoration-none see-detail\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\" data-id=" + data.imdbID + ">See Detail</a>\n                  </div>\n              </div>\n                  ");
        });
        $("#search-input").val("");
      } else {
        $(".result").html("<h1 class=\"text-center\">" + result.Error + "</h1>");
      }
    }
  });
}

$("#search-btn").on("click", function () {
  searchMovie();
});
$("#search-input").on("keyup", function (event) {
  if (event.keycode === 13) {
    searchMovie();
  }
});
$(".result").on("click", ".see-detail", function () {
  $.ajax({
    url: "http:omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "1f13ae4f",
      i: $(this).data("id")
    },
    success: function success(movie) {
      if (movie.Response === "True") {
        $(".modal-body").html("\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 justify-content-center\">\n                            <img src= " + movie.Poster + " class=\"img-fluid\">\n                        </div>\n                        <div class=\"col-md-6 mt-4 justify-content-center\">\n                        <ul class=\"list-group\">\n                        <li class=\"list-group-item active\" aria-current=\"true\">" + movie.Title + "</li>\n                        <li class=\"list-group-item\">Release: " + movie.Released + "</li>\n                        <li class=\"list-group-item\">Genre: " + movie.Genre + "</li>\n                        <li class=\"list-group-item\">Actors: " + movie.Actors + "</li>\n                        <li class=\"list-group-item\">Description: " + movie.Plot + "</li>\n                      </ul>\n                        </div>\n                    </div>\n                </div>\n        \n            ");
      }
    }
  });
});