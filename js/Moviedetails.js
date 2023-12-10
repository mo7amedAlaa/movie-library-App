const API_KEY = '41261d7d2db83ac2178bf226fce500cf';
const ID = localStorage.getItem('id');
const movieholder = document.getElementById('movie-detail__container');
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
function searchMovies(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((movie) => {
      const figure = document.createElement('figure');
      figure.classList.add('movie-detail-banner');
      const image = document.createElement('img');
      image.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
      image.setAttribute('alt', `${movie.title}`);
      const content = document.createElement('div');
      content.classList.add('movie-detail-content');
      const status = document.createElement('p');
      status.innerHTML = movie.status;
      status.classList.add('detail-subtitle');
      const title = document.createElement('h3');
      title.innerHTML = movie.title;
      title.classList.add('h1', 'detail-title');
      const metaWrapper = document.createElement('div');
      metaWrapper.classList.add('meta-wrapper');
      const badgeWrapper = document.createElement('div');
      badgeWrapper.classList.add('badge-wrapper');
      const badgeFill = document.createElement('div');
      badgeFill.classList.add('badge', 'badge-fill');
      badgeFill.innerHTML = `${movie.budget}$`;
      const badgeOutline = document.createElement('div');
      badgeOutline.classList.add('badge', 'badge-outline');
      if (movie.adult === false) {
        badgeOutline.innerHTML = '🔞Above 18';
      } else {
        badgeOutline.innerHTML = 'for all age';
      }
      const ganreWrapper = document.createElement('div');
      ganreWrapper.classList.add('ganre-wrapper');
      movie.genres.map((ele) => {
        const genre = document.createElement('a');
        genre.innerHTML = ele.name;
        ganreWrapper.appendChild(genre);
      });
      const dateTime = document.createElement('div');
      dateTime.classList.add('date-time');
      const div1 = document.createElement('div');
      const icon1 = document.createElement('ion-icon');
      icon1.setAttribute('name', 'calendar-outline');
      const time1 = document.createElement('time');
      time1.setAttribute('datetime', `${movie.release_date}`);
      time1.innerHTML = movie.release_date;
      const div2 = document.createElement('div');
      const icon2 = document.createElement('ion-icon');
      icon2.setAttribute('name', 'time-outline');

      const time2 = document.createElement('time');
      time2.setAttribute('datetime', `${movie.runtime}`);
      time2.innerHTML = movie.runtime;
      const storyline = document.createElement('p');
      storyline.classList.add('storyline');
      storyline.innerHTML = movie.overview;
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
      icon1.setAttribute('name', 'add-circle-outline');
      const addBtntitle = document.createElement('span');
      addBtntitle.innerHTML = 'Add To Watch List';
      figure.appendChild(image);
      div1.appendChild(icon1);
      div1.appendChild(time1);
      div2.appendChild(icon2);
      div2.appendChild(time2);
      dateTime.appendChild(div1);
      dateTime.appendChild(div2);
      badgeWrapper.appendChild(badgeFill);
      badgeWrapper.appendChild(badgeOutline);
      metaWrapper.appendChild(badgeWrapper);
      metaWrapper.appendChild(ganreWrapper);
      metaWrapper.appendChild(dateTime);
      AddWatchlistBtn.appendChild(icon3);
      AddWatchlistBtn.appendChild(addBtntitle);
      detailsActions.appendChild(AddWatchlistBtn);
      content.appendChild(title);
      content.appendChild(status);
      content.appendChild(metaWrapper);
      content.appendChild(storyline);
      content.appendChild(detailsActions);
      movieholder.appendChild(figure);
      movieholder.appendChild(content);
      console.log(movie);
    });
}
searchMovies(ID);
