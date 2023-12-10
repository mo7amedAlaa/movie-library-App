const API_KEY = '41261d7d2db83ac2178bf226fce500cf';
const searchInput = document.getElementById('searchInput');
console.log(searchInput);
const searchBtn = document.getElementById('searchBtn');

function handleDetsilsLink(id) {
  localStorage.setItem('id', id);
}
async function fetchMovies(endpoint, sectionId) {
  await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const section = document.getElementById(sectionId);
      data.results
        .map((movie) => {
          const li = document.createElement('li');
          const moviediv = document.createElement('div');
          moviediv.classList.add('movie-card');
          const imgDetailsLink = document.createElement('a');
          imgDetailsLink.setAttribute('href', './page/Moviedetails.html');
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
          titleDetailsLink.setAttribute('href', './page/Moviedetails.html');
          const title = document.createElement('h3');
          title.classList.add('card-title');
          const time = document.createElement('time');
          time.setAttribute('time', `${movie.release_date.slice(0, 5)}`);
          title.innerHTML = movie.title.slice(0, 20);
          time.innerHTML = movie.release_date.slice(0, 4);
          const cardMeta = document.createElement('div');

          cardMeta.classList.add('card-meta');
          cardMeta.style.justifyContent = 'space-between';
          const badge = document.createElement('div');
          badge.classList.add('badge', 'badge-outline');
          badge.innerHTML = movie.original_language;
          const rating = document.createElement('div');
          rating.classList.add('rating');
          const star = document.createElement('ion-icon');
          star.setAttribute('name', 'star');
          const data = document.createElement('data');
          data.innerHTML = Number(movie.vote_average).toFixed(1);
          rating.appendChild(star);
          rating.appendChild(data);
          cardMeta.appendChild(badge);
          cardMeta.appendChild(rating);
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
          titleWrapper.appendChild(time);
          moviediv.appendChild(imgDetailsLink);
          moviediv.appendChild(titleWrapper);
          moviediv.appendChild(cardMeta);
          li.appendChild(moviediv);
          section.appendChild(li);
          // console.log(movie);
        })
        .join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchMovies('movie/popular', 'featuredSec');
  fetchMovies('movie/upcoming', 'incommingSec');
  fetchMovies('movie/top_rated', 'topRatedSec');
  fetchMovies('trending/movie/week', 'trendingSec');
});
function setInputVal() {
  const val = searchInput.value;
  localStorage.setItem('inputVal', val);
}
searchBtn.addEventListener('click', () => setInputVal());

async function getTvSeriesDetails(seriesId) {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}`;
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  const response = await fetch(`${url}?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const movie = await response.json();
  const section = document.getElementById('TV');
  const li = document.createElement('li');
  const moviediv = document.createElement('div');
  moviediv.classList.add('movie-card');
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
  const title = document.createElement('h3');
  title.classList.add('card-title');
  const time = document.createElement('time');
  const cardMeta = document.createElement('div');
  cardMeta.classList.add('card-meta');
  cardMeta.style.justifyContent = 'space-between';
  const badge = document.createElement('div');
  badge.classList.add('badge', 'badge-outline');
  badge.innerHTML = movie.original_language;
  const rating = document.createElement('div');
  rating.classList.add('rating');
  const star = document.createElement('ion-icon');
  star.setAttribute('name', 'star');
  const data = document.createElement('data');
  data.innerHTML = Number(movie.vote_average).toFixed(1);
  rating.appendChild(star);
  rating.appendChild(data);
  cardMeta.appendChild(badge);
  cardMeta.appendChild(rating);

  imageDiv.appendChild(image);
  titleWrapper.appendChild(title);

  moviediv.appendChild(imageDiv);
  moviediv.appendChild(titleWrapper);
  moviediv.appendChild(cardMeta);
  li.appendChild(moviediv);
  section.appendChild(li);
}
getTvSeriesDetails(10000);
getTvSeriesDetails(238256);
getTvSeriesDetails(10160);
getTvSeriesDetails(210945);
getTvSeriesDetails(1220);
getTvSeriesDetails(229732);
getTvSeriesDetails(73031);
getTvSeriesDetails(217943);
