function searchMovie() {
  $(".result").html("");
  $.ajax({
    url: "http:omdbapi.com",
    type: "get",
    datatype: "json",
    data: {
      apikey: "1f13ae4f",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movie = result.Search;

        $.each(movie, function (i, data) {
          $(".result").append(
            `
              <div class="col-md-4 ">
                  <div class="card">
                      <img src="` +
              data.Poster +
              `" class="card-img-top" alt="Poster">
                      <div class="card-body">
                      <h5 class="card-title">` +
              data.Title +
              `</h5>
                <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                <a href="#" class="card-link text-decoration-none see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=` +
              data.imdbID +
              `>See Detail</a>
                  </div>
              </div>
                  `
          );
        });

        $("#search-input").val("");
      } else {
        $(".result").html(`<h1 class="text-center">` + result.Error + `</h1>`);
      }
    },
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
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 justify-content-center">
                            <img src= ` +
            movie.Poster +
            ` class="img-fluid">
                        </div>
                        <div class="col-md-6 mt-4 justify-content-center">
                        <ul class="list-group">
                        <li class="list-group-item active" aria-current="true">` +
            movie.Title +
            `</li>
                        <li class="list-group-item">Release: ` +
            movie.Released +
            `</li>
                        <li class="list-group-item">Genre: ` +
            movie.Genre +
            `</li>
                        <li class="list-group-item">Actors: ` +
            movie.Actors +
            `</li>
                        <li class="list-group-item">Description: ` +
            movie.Plot +
            `</li>
                      </ul>
                        </div>
                    </div>
                </div>
        
            `
        );
      }
    },
  });
});
