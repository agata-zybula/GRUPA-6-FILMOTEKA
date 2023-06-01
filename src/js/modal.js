import './add-to-local-storage';
import { genreList, getGenres } from './fetch-genres';
import axios from 'axios';

// Open or close modal
const openModal = document.querySelector('[data-modal-open]');
const openModalOnCard = document.querySelector('.card');
const modalWindow = document.querySelector('.modal__window');
const closeModal = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const cardEl = document.querySelectorAll('.card');

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

function offModalForEscape(e) {
  if (e.key === 'Escape') {
    modal.classList.add('is-hidden');
  }
}

document.addEventListener('keydown', offModalForEscape);

function offModalClick(event) {
  if (event.target !== modalWindow) {
    modal.classList.add('is-hidden');
  }
}
window.addEventListener('click', offModalClick);

const posters = document.querySelector('.cards-wrapper');
posters.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    event.stopPropagation();
    selectFilm(event);
    toggleModal();
  }
});
function selectFilm(event) {
  let filmId = event.target.dataset.id;
  getMovieData(filmId);
}

// Fetch movie info
const titleEl = document.querySelector('h2.modal__title');
const voteRatingEl = document.getElementById('queryVoteRating');
const voteCountEl = document.getElementById('queryVoteCount');
const popularityEl = document.getElementById('queryPopularity');
const originalTitleEl = document.getElementById('queryOriginalTitle');
const genreEl = document.getElementById('queryGenre');
const posterEl = document.querySelector('.modal__poster');
const overviewEl = document.querySelector('.modal__summary-text');

// Fetch trending
const inputEl = document.querySelector('.header-search-bar__input');

const searchMovieAPI_URL = 'https://api.themoviedb.org/3/search/movie';
const API_key = 'dbea77d3eb5b3622b027f73f6a5032fe';

const findMovieApi_URL = 'https://api.themoviedb.org/3/movie/';

const fetchMovies = async () => {
  const response = await fetch(
    `${searchMovieAPI_URL}?api_key=${API_key}&query=${inputEl.value}&page=1&language=en-US`,
  );
  return response.json();
};

async function getMovieById(filmId) {
  try {
    const response = await axios.get(`${findMovieApi_URL}${filmId}?api_key=${API_key}`);
    const movies = response.data;

    console.log(`movies`, movies);
    await getGenres();
    return movies;
  } catch (error) {
    console.error(error);
  }
}

async function getMovieData(filmId) {
  getMovieById(filmId).then(movies => {
    const movieData = movies;

    const movie = {
      title: movieData.title,
      vote_average: movieData.vote_average,
      vote_count: movieData.vote_count,
      popularity: movieData.popularity,
      originalTitle: movieData.original_title,
      genres: movieData.genres.map(genre => genre.name).slice(0, 3).join(", "),
      id: movieData.id,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
    };

    console.log(movie);
    console.log(movie.id);

    let modal = document.querySelector('.modal');
    const closeModal = document.querySelector('[data-modal-close]');
    const posterEl = document.querySelector('.modal__poster');
    const titleEl = document.querySelector('h2.modal__title');
    const voteRatingEl = document.getElementById('queryVoteRating');
    const voteCountEl = document.getElementById('queryVoteCount');
    const popularityEl = document.getElementById('queryPopularity');
    const originalTitleEl = document.getElementById('queryOriginalTitle');
    const genreEl = document.getElementById("queryGenre");
    const overviewEl = document.querySelector('.modal__summary-text');
    const dataId = document.querySelector('.id');

    modal.classList.remove('is-hidden');
    posterEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    titleEl.innerHTML = `${movie.title}`;
    console.log(`${movie.title}`);
    voteRatingEl.innerHTML = `${movie.vote_average.toFixed(1)}`;
    voteCountEl.innerHTML = `${movie.vote_count}`;
    popularityEl.innerHTML = `${movie.popularity}`;
    originalTitleEl.innerHTML = `${movie.originalTitle}`;
    genreEl.innerHTML = `${movie.genres}`;
    overviewEl.innerHTML = `${movie.overview}`;
    dataId.innerHTML = `${movie.id}`;

    closeModal.addEventListener('click', () => {
      modal.classList.add('is-hidden');
    });
  });
}
