//This JavaScript code is designed to fetch and display a list of movies based on a user's search query using the OMDb API.

// API endpoint: The apiUrl variable holds the base URL for the OMDb API, which is used to fetch movie data.
const apiUrl = "https://www.omdbapi.com/?apikey=8e83ab41";
const pexelsApiKey = "6vpFja9hWeUY46qrRMFDBgNSiHVNmgc8am5qP9vqKMFiV1Wh4F4TZY7m";

// DOM elements: Three variables (searchForm, searchInput, and movieList) store references to DOM elements, which are used to handle user input and display search results.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const movieList = document.querySelector("#movie-list");

// this will hold a list of your previous searches, most recent at the top
const ulEl = document.querySelector("#aside > ul");

// Event listener for search form submission: An event listener is added to the searchForm element,
// which listens for the "submit" event. When the form is submitted, the event is prevented from refreshing the page,
// and the searchMovies function is called with the user's search term.
// .trim() method removes white space so the program can take in data without getting errors
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchMovies(searchTerm);
  }
});

// when a search is ran, add the search term to the aside's unordered list
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  const prevSearchTermsArray =
    JSON.parse(localStorage.getItem("previousSearches")) || [];
  // add the most recent search to my search array that I just retrieved from local storage
  prevSearchTermsArray.unshift(searchTerm);
  // now save back to local storage
  localStorage.setItem(
    "previousSearches",
    JSON.stringify(prevSearchTermsArray)
  );

  addSearchTermToAside(searchTerm);
});

function addSearchTermToAside(searchText) {
  // create the anchor first
  // const a = document.createElement('a');
  // a.setAttribute('href', searchText);
  //maybe add a class to it to style it as well
  //a.classList.add('someClassName');
  // create a list item next
  const li = document.createElement('li');
  // set its text content to searchText
  li.textContent = searchText;
  // add the li to the a
  // a.append(li);
  // my li only exists in JavaScript, until I append it to something pre-existing in the DOM...
  ulEl.prepend(li);
}

function retrieveFromLocalStorageAndAddToAside() {
  const prevSearchTermsArray =
  JSON.parse(localStorage.getItem("previousSearches")) || [];
  // loop through the array
  for(let i = 0; i < prevSearchTermsArray.length; i++) {
    addSearchTermToAside(prevSearchTermsArray[i])
  }
}

// run function on page load
retrieveFromLocalStorageAndAddToAside();

// lets add an event listener to our unordered list in the aside element, and only do something if the event.target.matches('li');
ulEl.addEventListener('click', (e) => {
  if(e.target.matches('li')) {
    const searchText = e.target.textContent;
    searchMovies(searchText);
  }
})

// Function to search for movies: The searchMovies function takes a search term as an argument,
// clears any existing search results, constructs the API URL with the search term, and makes a request to the OMDb API.
// If the API returns an array of movies, the displayMovie function is called for each movie.
// If no movies are found or an error occurs, an error message is displayed.
function searchMovies(searchTerm) {
  // Clear any existing search results
  movieList.innerHTML = "";

  // Construct API URL with search term: jQuery method of string interpolation is used in order to write out the variables using the back ticks to concatenate using the query parameters given by OMDb.
  // the below url is created using the search term values in tandem with api url.
  const url = `${apiUrl}&s=${searchTerm}&type=movie`;

  // Make API request: The function makes a fetch request to the constructed URL. If the request is successful, it parses the response as JSON and checks if the data object returned has a property called Search.
  // The then() method is called on the resulting promise, which takes two callback functions. The first callback function takes the response object and returns its JSON representation. The second callback function takes the parsed JSON object as its argument, checks if it contains a property called Search, and iterates through its array value (which is an array of movie objects) using the forEach() method. For each movie object, the displayMovie() function is called with the movie object as its argument.
  // If the fetch request fails, the function catches the error and displays an error message indicating the reason for the failure.
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
// N/A is a built in property for vs code, where if the property isnt defined it wont display the image but the alt message
function displayMovie(movie) {
  // Check if movie object has a valid poster image
  if (movie.Poster === "N/A") {
    return;
  }

  // Create DOM elements for the movie card
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

  // Add click event listener to the movie card
  movieCard.addEventListener("click", () => {
    window.open(movieLink.href);
    // Display more information about the movie, such as plot summary, cast and crew, etc.
    // You can use another API to fetch this information, or display it using a modal or a separate page.
    console.log("Movie card clicked: " + movie.Title);
  });

  movieList.appendChild(movieCard);
}

// this JavaScript code allows users to search for movies by title, fetches movie data from the OMDb API,
// and displays the search results in a visually appealing way. When a user clicks on a movie card,
// you can add functionality to display more information about the movie, such as a plot summary, cast and crew, etc.

// The setBackgroundImage function is an asynchronous function, which means it can perform operations that take some time to complete, such as fetching data from an API.
// Define the API endpoint URL with the search query set to "movies" and the number of results per page set to 40.
// Fetch data from the Pexels API using the fetch function. // The headers object contains the API key for authorization.
// Parse the response data as JSON.
// Generate a random index based on the length of the photos array to select a random photo from the results.
// Get the URL of the large-sized image from the randomly selected photo.
// Set the background image of the document body to the fetched image URL.
// If there's an error while fetching the background image, log the error message.

const setBackgroundImage = async () => {
  const url = `https://api.pexels.com/v1/search?query=movies`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    const imageUrl = data.photos[randomIndex].src.original;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
    console.error(`Error fetching background image: ${error}`);
  }
};
setBackgroundImage();