// export const watchlistElement = document.getElementById('Watchlist');
// export default class Watchlist {
//   constructor() {
//     this.watchlist = [];
//   }

//   addItem(item) {
//     this.watchlist.push(item);
//     this.saveToLocalStorage();
//     this.renderWatchlist();
//   }

//   removeItem(index) {
//     this.watchlist.splice(index, 1);
//     this.saveToLocalStorage();
//     this.renderWatchlist();
//   }

//   saveToLocalStorage() {
//     localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
//   }

//   renderWatchlist() {
//     console.log(watchlistElement);
//     // watchlistElement.innerHTML = ' ';
//     this.watchlist.forEach((movie, index) => {
//       const li = document.createElement('li');
//       li.innerHTML = movie.tittle;
//       const removeButton = document.createElement('button');
//       removeButton.textContent = 'Remove';
//       removeButton.addEventListener('click', () => {
//         this.removeItem(index);
//       });
//       li.appendChild(removeButton);
//       watchlistElement.appendChild(li);
//     });
//   }
// }

// const watchlist = new Watchlist();

// // Retrieve watchlist from local storage
// const watchlistData = localStorage.getItem('watchlist');
// if (watchlistData) {
//   watchlist.watchlist = JSON.parse(watchlistData);
// }

// Render initial watchlist
// watchlist.renderWatchlist();

// Add item form submission
// document
//   .getElementById('addItemForm')
//   .addEventListener('submit', function (event) {
//     event.preventDefault();

//     const itemInput = document.getElementById('itemInput');
//     const item = itemInput.value;

//     watchlist.addItem(item);

//     itemInput.value = '';
//   });
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function displayWatchlist() {
  const watchlistElement = document.getElementById('watchlist');
  watchlist.map((movie, index) => {
    const li = document.createElement('li');
    const moviediv = document.createElement('div');
    moviediv.classList.add('movie-card');
    const imgDetailsLink = document.createElement('a');
    imgDetailsLink.setAttribute('href', './/Moviedetails.html');
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
    imgDetailsLink.addEventListener('click', () => handleDetsilsLink(movie.id));
    imgDetailsLink.setAttribute('target', '_blank');
    imageDiv.appendChild(image);
    imgDetailsLink.appendChild(imageDiv);
    titleDetailsLink.appendChild(title);
    titleWrapper.appendChild(titleDetailsLink);
    moviediv.appendChild(imgDetailsLink);
    moviediv.appendChild(titleWrapper);
    const detailsActions = document.createElement('div');
    detailsActions.classList.add('details-actions');
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
      removeMovie(index);
    });
    removeBtn.classList.add('btn', 'btn-primary');
    const icon3 = document.createElement('ion-icon');
    icon3.setAttribute('name', 'remove-circle-outline');
    const removeBtntitle = document.createElement('span');
    removeBtntitle.innerHTML = 'Remove';
    removeBtn.appendChild(icon3);
    removeBtn.appendChild(removeBtntitle);
    detailsActions.appendChild(removeBtn);
    moviediv.appendChild(detailsActions);
    li.appendChild(moviediv);
    watchlistElement.appendChild(li);
  });
}

function addMovie(movie) {
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

function removeMovie(index) {
  watchlist.splice(index, 1);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  // displayWatchlist();
  location.reload();
}

displayWatchlist();
