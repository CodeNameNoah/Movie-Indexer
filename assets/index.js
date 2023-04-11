//This JavaScript code is designed to fetch and display a list of movies based on a user's search query using the OMDb API.


// API endpoint
// API endpoint: The apiUrl variable holds the base URL for the OMDb API, which is used to fetch movie data.
const apiUrl = "https://www.omdbapi.com/?apikey=8e83ab41";

// DOM elements
// DOM elements: Three variables (searchForm, searchInput, and movieList) store references to DOM elements, which are used to handle user input and display search results.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const movieList = document.querySelector("#movie-list");