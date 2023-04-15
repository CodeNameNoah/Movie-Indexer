# Movie-Indexer

We are excited to tell you about the application my team and I made using HTML, CSS, JavaScript, APIs from OMBD movies, and a Bootstrap alternative known as Materialize. Our application is designed to provide users with an easy and efficient way to search for information about their favorite movies.

## Description

With the help of HTML and CSS, we created a clean and user-friendly interface that allows users to search for movies using a simple search bar. We also used Materialize, which is a CSS framework that provides a modern and responsive design.

JavaScript played a crucial role in our application as we utilized it to interact with the OMBD API. This allowed us to fetch movie data from the API and display it on our application in an organized manner. With the help of JavaScript, we were able to create dynamic elements that update as the user types their search query.

The OMBD API was a valuable resource that allowed us to access detailed information about movies, such as the plot, release date, and cast. We incorporated this information into our application, making it easy for users to get a comprehensive overview of the movie they are interested in.

Overall, our application is a powerful tool that simplifies the movie-searching process for users. With the help of HTML, CSS, JavaScript, and the OMBD API, we were able to create a seamless user experience that provides movie enthusiasts with everything they need to know about their favorite films.

---

## Languages and Technologies Used

[![Socials](https://skillicons.dev/icons?i=html,css,js,git)](https://skillicons.dev)

| Additional Libraries Used |                    Link                     |
| :-----------------------: | :-----------------------------------------: |
|       `Materialize`       |     [LINK](https://materializecss.com/)     |
|    `Google Fonts API`     | [LINK](https://developers.google.com/fonts) |
|        `OMBD API`         |      [LINK](https://www.omdbapi.com/)       |

---

|     Collaborators      |                                                                                                                                  Socials                                                                                                                                   |
| :--------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      `Noah Hoang`      | [![Socials](https://skillicons.dev/icons?i=git)](https://github.com/codenamenoah) [![Socials](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/codenamenoah/) [![Socials](https://skillicons.dev/icons?i=twitter)](https://twitter.com/CodeNameNoahH) |
| `Tia 'Michelle' Baker` |                                                                                           [![Socials](https://skillicons.dev/icons?i=git)](https://github.com/michellebaker1129)                                                                                           |
|     `Kyle Wayland`     |                                                                                              [![Socials](https://skillicons.dev/icons?i=git)](https://github.com/kylecoding1)                                                                                              |
|   `Afi Nkhume-Crecy`   |                                        [![Socials](https://skillicons.dev/icons?i=git)](https://github.com/AFICRECY) [![Socials](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/afi-nkhume-crecy-932862128/)                                        |

---

## Take A Look At Our Application!

![Cinexplorer - Movie Search Engine (1)](https://user-images.githubusercontent.com/127361736/231364570-eb024729-1fe9-4134-a29f-bc1f010a6c50.gif)

## Links

- Link to live application https://codenamenoah.github.io/Movie-Indexer/

---

## Installation

**To Clone Our Repository Using CLI**

1. Click on the green code button and copy the link for the SSH key.
2. Once clip-boarded load up a command line interface and change directory to one of your preference
3. Enter in the command `git clone git@github.com:CodeNameNoah/Movie-Indexer.git`
4. Enter your protected SSH password
5. Enjoy!

**To Download Our Repository as a ZIP File**

1. Click on the green code button
2. In the bottom of the drop-down menu, click Download Zip
3. Enjoy!


To install this project, a knowledge of HTML, CSS, JavaScript, Third Party API’s like Materialize CSS, and Server-Side API's such as OMDb and Pexels were required. Methods used ranged from functions, document window methods, querySelector, getElementById, Event Listeners, Local Storage, Variables, If/Else Statements, and Data Types, Jquery UI widgets, and Materialize’s pre-designed styling components and classes. The web application is intended for the user to be able to input into the search bar and get information on movies, movie genres, and movies surrounding a specific theme. With our web application, multiple movie searches can be made, allowing users to search for movies by title or genre, view a list of matching movies with posters, titles, and release years, and click on each movie to be redirected to a new link to view more details.


```
const apiUrl = "https://www.omdbapi.com/?apikey=8e83ab41";
const pexelsApiKey = "6vpFja9hWeUY46qrRMFDBgNSiHVNmgc8am5qP9vqKMFiV1Wh4F4TZY7m";
```
Above: First we have our API endpoint stored in the API url variable.Eventually we will use this link and key to fetch and display a list of movies based on a user's search query using the OMDb API. We also have the Pexels API link which gives us access to Pexel's image database. 


```
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchMovies(searchTerm);
  }
});
```
Above: This code snippet adds an Event listener to our submit id, on our search button. 
The e.preventDefault(); method prevents the web page reload/redirect default behavior of the form submission. The next line const searchTerm = searchInput.value.trim(); extracts the search query entered by the user into the search input field, 
removes any leading or trailing whitespace using the trim() method,and assigns it to a searchTerm variable.
The if statement checks if the searchTerm is not an empty string, indicating that the user has entered a valid search query. If the searchTerm is not empty, the searchMovies() function is called with the searchTerm as a parameter to execute the search and display the results on the web page.


```
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  const prevSearchTermsArray =
    JSON.parse(localStorage.getItem("previousSearches")) || [];
  prevSearchTermsArray.unshift(searchTerm);
  localStorage.setItem(
    "previousSearches",
    JSON.stringify(prevSearchTermsArray)
  );
  addSearchTermToAside(searchTerm);
});

function addSearchTermToAside(searchText) {
  const li = document.createElement('li');
  li.textContent = searchText;
  ulEl.prepend(li);
}

function retrieveFromLocalStorageAndAddToAside() {
  const prevSearchTermsArray =
  JSON.parse(localStorage.getItem("previousSearches")) || [];
  for(let i = 0; i < prevSearchTermsArray.length; i++) {
    addSearchTermToAside(prevSearchTermsArray[i])
  }
}

retrieveFromLocalStorageAndAddToAside();
ulEl.addEventListener('click', (e) => {
  if(e.target.matches('li')) {
    const searchText = e.target.textContent;
    searchMovies(searchText);
  }
})
```
Above: This JavaScript code shows an example of using local storage to save search terms and display them in an unordered list. 
The function addSearchTermToAside creates a new list item element and sets its text content to the search term, then prepends the list item to an unordered list element in the aside section of the web page. The function retrieveFromLocalStorageAndAddToAside retrieves the previous search terms array from local storage, loops through it, and calls addSearchTermToAside for each search term in the array.


```
function searchMovies(searchTerm) {
  movieList.innerHTML = "";
  const url = `${apiUrl}&s=${searchTerm}&type=movie`;

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
```
Above: This is the use of our frist API (IMDb) and the function to search for movies: The searchMovies function takes a search term as an argument, clears any existing search results, constructs the API URL with the search term, and makes a request to the OMDb API. If the API returns an array of movies, the displayMovie function is called for each movie. If no movies are found or an error occurs, an error message is displayed.



```
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
```
Above: This is the use of our second API (Pexels) in the setBackgroundImage function. This is an asynchronous function, which means it can perform operations that take some time to complete, such as fetching data from an API.Define the API endpoint URL with the search query set to "movies" and the number of results per page set to 40. Fetch data from the Pexels API using the fetch function. 



![github](https://user-images.githubusercontent.com/127361736/227422005-d28a9020-e331-4098-976b-df9c1e545bb4.png)

---

## Usage

1. Click on the link to the live application of the Movie-Indexer
2. Type the name of a movie or genre you would like to search up
3. Click the search button to invoke a query of the specified text you previously typed in the search field
4. You will then be directed to another page where you can view the catalog of movies or genre you searched up.

- Note that you can still search even within the results page.

## Credits & Source Codes

- Guide for Gifs to use in README.md

  - https://www.youtube.com/watch?v=3RlpVrYt_qE&ab_channel=AskCloudArchitech

- Materialize Front-End Framework

  - https://materializecss.com/

- Google Fonts API

  - https://fonts.google.com/

- OMDb API

  - https://www.omdbapi.com/

- Pexels API

  - https://www.pexels.com/api/

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the MIT license.

---
