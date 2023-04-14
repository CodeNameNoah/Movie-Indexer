const apiUrl = "https://www.omdbapi.com/?apikey=8e83ab41";
const pexelsApiKey = "6vpFja9hWeUY46qrRMFDBgNSiHVNmgc8am5qP9vqKMFiV1Wh4F4TZY7m";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const movieList = document.querySelector("#movie-list");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchMovies(searchTerm);
  }
});

function loadLastSearchResults() {
  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch !== null && lastSearch !== "") {
    searchMovies(lastSearch);
  }
}

function searchMovies(searchTerm) {
  let lastSearches = JSON.parse(localStorage.getItem("lastSearches")) || [];
  lastSearches.push(searchTerm);
  localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
  
  movieList.innerHTML = "";
  const url = `${apiUrl}&s=${searchTerm}&type=movie`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Search) {
        data.Search.forEach((movie) => {
          displayMovie(movie);
        });
      } else {
        const errorMessage = `<p>No movies found matching "${searchTerm}".</p>`;
        movieList.innerHTML = errorMessage;
      }
    })
    .catch((error) => {
      const errorMessage = `<p>Error fetching movies: ${error.message}</p>`;
      movieList.innerHTML = errorMessage;
    });
}

function loadLastSearchResults() {
  const lastSearches = JSON.parse(localStorage.getItem("lastSearches"));
  if (lastSearches !== null && lastSearches.length > 0) {
    const lastSearch = lastSearches[lastSearches.length - 1];
    searchMovies(lastSearch);
  }
}


function displayMovie(movie) {
  if (movie.Poster === "N/A") {
    return;
  }

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const moviePoster = document.createElement("img");
  moviePoster.src = movie.Poster;
  moviePoster.alt = movie.Title + " poster";
  moviePoster.classList.add("movie-poster");

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.Title;
  movieTitle.classList.add("movie-title");

  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");

  const movieLink = document.createElement("a");
  movieLink.href = `https://www.imdb.com/title/${movie.imdbID}/`;
  movieLink.target = "_blank";
  movieLink.textContent = movie.Title;
  movieLink.classList.add("movie-link");

  const movieYear = document.createElement("span");
  movieYear.textContent = movie.Year;

  movieDetails.appendChild(movieLink);
  movieDetails.appendChild(movieYear);

  movieCard.appendChild(moviePoster);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieDetails);

  movieCard.addEventListener("click", () => {
    window.open(movieLink.href);
    console.log("Movie card clicked: " + movie.Title);
  });

  movieList.appendChild(movieCard);
}

const setBackgroundImage = async () => {
  const url = `https://api.pexels.com/v1/search?query=inspiration&per_page=40`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': pexelsApiKey
      }
    });
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    const imageUrl = data.photos[randomIndex].src.large2x;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
    console.error(`Error fetching background image: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadLastSearchResults();
  setBackgroundImage();
});