let currentId = 0;

let moviesList = [];

// NOTE (bsolis): Wait for page load
$(function() {

  // NOTE (bsolis): On form submit, append values to movie table body.
  $("#new-movie-form").on("submit", evt => {
    evt.preventDefault();

    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { 
        title, 
        rating, 
        currentId 
    };

    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  // NOTE (bsolis): On button click, splice from movie list array.
  $("tbody").on("click", ".btn.btn-danger", evt => {
    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))
    
    moviesList.splice(indexToRemoveAt, 1)

    $(evt.target)
      .closest("tr")
      .remove();
    
  });

  // NOTE (bsolis): On sort arrow click, run sortBy function.
  $(".fas").on("click", evt => {
    
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    $("#movie-table-body").empty();

    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

// NOTE (bsolis): sortBy function 
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a, b) {

    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }

    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }

    return 0;
  });
}

// NOTE (bsolis): Function creates tr featuring tds for title, rating, and delete button.
function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
