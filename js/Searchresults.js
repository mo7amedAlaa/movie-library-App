// import Watchlist from './Watchlist.js';
const API_KEY = '41261d7d2db83ac2178bf226fce500cf';
const localQuery = localStorage.getItem('inputVal');
const searchSection = document.getElementById('searchSec');
// import { addMovie } from './Watchlist.js';
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
function searchMovies(query) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie, index) => {
        const li = document.createElement('li');
        const moviediv = document.createElement('div');
        moviediv.classList.add('movie-card');
        const imgDetailsLink = document.createElement('a');
        imgDetailsLink.setAttribute('href', './Moviedetails.html');
        const imageDiv = document.createElement('figure');
        imageDiv.classList.add('card-banner');
        const image = document.createElement('img');
        image.setAttribute(
          'src',
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        );
        image.setAttribute('alt', `${movie.title}`);
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');
        const titleDetailsLink = document.createElement('a');
        titleDetailsLink.setAttribute('href', './Moviedetails.html');
        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.innerHTML = movie.title;
        const overview = document.createElement('p');
        overview.innerHTML = title.overview;
        titleDetailsLink.addEventListener('click', () =>
          handleDetsilsLink(movie.id)
        );
        titleDetailsLink.setAttribute('target', '_blank');
        imgDetailsLink.addEventListener('click', () =>
          handleDetsilsLink(movie.id)
        );
        imgDetailsLink.setAttribute('target', '_blank');
        imageDiv.appendChild(image);
        imgDetailsLink.appendChild(imageDiv);
        titleDetailsLink.appendChild(title);
        titleWrapper.appendChild(titleDetailsLink);
        moviediv.appendChild(imgDetailsLink);
        moviediv.appendChild(titleWrapper);
        const detailsActions = document.createElement('div');
        detailsActions.classList.add('details-actions');
        const AddWatchlistBtn = document.createElement('button');
        AddWatchlistBtn.addEventListener('click', () => {
          watchlist.push(movie);
          let result = watchlist.filter(
            (obj, index, self) =>
              index ===
              self.findIndex((el) => el.id === obj.id && el.name === obj.name)
          );
          localStorage.setItem('watchlist', JSON.stringify(result));
        });
        AddWatchlistBtn.classList.add('btn', 'btn-primary');
        const icon3 = document.createElement('ion-icon');
        icon3.setAttribute('name', 'add-circle-outline');
        const addBtntitle = document.createElement('span');
        addBtntitle.innerHTML = 'Add To Watch List';
        AddWatchlistBtn.appendChild(icon3);
        AddWatchlistBtn.appendChild(addBtntitle);
        detailsActions.appendChild(AddWatchlistBtn);
        moviediv.appendChild(detailsActions);
        li.appendChild(moviediv);
        searchSection.appendChild(li);
      });
      console.log(data.results);
    });
}
function handleDetsilsLink(id) {
  localStorage.setItem('id', id);
}
searchMovies(localQuery);
