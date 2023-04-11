//This JavaScript code is designed to fetch and display a list of movies based on a user's search query using the OMDb API.


// API endpoint
// API endpoint: The apiUrl variable holds the base URL for the OMDb API, which is used to fetch movie data.
const apiUrl = "https://www.omdbapi.com/?apikey=8e83ab41";

// DOM elements
// DOM elements: Three variables (searchForm, searchInput, and movieList) store references to DOM elements, which are used to handle user input and display search results.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const movieList = document.querySelector("#movie-list");

// Event listener for search form submission
// Event listener for search form submission: An event listener is added to the searchForm element, 
// which listens for the "submit" event. When the form is submitted, the event is prevented from refreshing the page, 
// and the searchMovies function is called with the user's search term.

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      searchMovies(searchTerm);
    }
  });

// Function to search for movies
// Function to search for movies: The searchMovies function takes a search term as an argument, 
// clears any existing search results, constructs the API URL with the search term, and makes a request to the OMDb API. 
// If the API returns an array of movies, the displayMovie function is called for each movie. 
// If no movies are found or an error occurs, an error message is displayed.
function searchMovies(searchTerm) {
    // Clear any existing search results
    movieList.innerHTML = "";
  
    // Construct API URL with search term
    const url = `${apiUrl}&s=${searchTerm}&type=movie`;
  
    // Make API request
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          // Display search results
          data.Search.forEach((movie) => {
            displayMovie(movie);
          });
        } else {
          // Display error message
          const errorMessage = `<p>No movies found matching "${searchTerm}".</p>`;
          movieList.innerHTML = errorMessage;
        }
      })
      .catch((error) => {
        // Display error message
        const errorMessage = `<p>Error fetching movies: ${error.message}</p>`;
        movieList.innerHTML = errorMessage;
      });
  }
  
  // Function to display a movie: The displayMovie function takes a movie object as an argument,
// checks if the movie has a valid poster image, and creates a set of DOM elements to display the movie's poster, title, and year. 
// A click event listener is added to the movie card, which, when clicked, logs the movie's title in the console (you can replace this with code to display additional movie information). 
// Finally, the movie card is appended to the movieList element.

function displayMovie(movie) {
    // Check if movie object has a valid poster image
    if (movie.Poster === "N/A") {
      return;
    }

    // Create DOM elements for the movie card
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");