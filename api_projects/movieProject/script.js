const movieContainer = document.getElementById("movie-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// const API_KEY = " c4e2df4"; // Replace with your actual API key;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== "") {
    getMovieInformation(query);
  } else {
    movieContainer.innerHTML =
      "<p class='text-danger display-6'>Please enter a search term.</p>";
  }
});

let getMovieInformation = async (query) => {
  const url = ` http://www.omdbapi.com/?i=tt3896198&apikey=c4e2df4&t=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data);
};

function displayMovies(movies) {
  const { Title, Year, Poster, Plot, Genre, Director, Actors, imdbRating } =
    movies;
  movieContainer.innerHTML = `
    <div class="movie-card p-3 border rounded d-flex">
      <div>
        <img src="${Poster}" class="mb-2" alt="${Title} Poster" />
      </div>
      <div class="ms-5">
        <h3>${Title}</h3>
        <p><strong>Year:</strong> ${Year}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
      </div>
    </div>
  `;
}

// Example usage with dummy data
