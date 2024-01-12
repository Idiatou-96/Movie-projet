const apiKey = "a07c71098c0a43b58d09f2fbf8af3602";
function fetchMovies(endpoint, containerId) {
  fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const moviesContainer = document.getElementById(containerId);
      moviesContainer.innerHTML = ""; // Clear previous content

      if (data.results && data.results.length > 0) {
        data.results.forEach((movie) => {
          const card = document.createElement("div");
          card.className = "movie-card";

          const title = document.createElement("h3");
          title.textContent = movie.title;

          const image = document.createElement("img");
          image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          image.alt = movie.title;

          card.appendChild(title);
          card.appendChild(image);
          moviesContainer.appendChild(card);
        });
      } else {
        moviesContainer.innerHTML = "No movies found.";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function searchMovies() {
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() !== "") {
    fetchMovies(`search/movie?query=${searchInput}`, "nowPlaying");
  } else {
    alert("Please enter a movie title for search.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies("now_playing", "nowPlaying");
  fetchMovies("top_rated", "topRated");
});
