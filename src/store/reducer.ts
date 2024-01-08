import {createReducer} from '@reduxjs/toolkit';
import {fetchCurrentFilm, fetchFilms, fetchPromo, setGenre} from './action.ts';
import {Film, FilmListElement} from '../types/film.ts';

export const DEFAULT_GENRE = 'All genres';

interface AppState {
  genre: string;
  films: FilmListElement[];
  allFilms: FilmListElement[];
  isFilmsLoading: boolean;
  promo?: Film;
  currentFilm?: Film;
  isCurrentFilmLoading: boolean;
  error?: string;
}

const initialState: AppState = {
  genre: DEFAULT_GENRE,
  films: [],
  allFilms: [],
  isFilmsLoading: false,
  promo: undefined,
  currentFilm: undefined,
  isCurrentFilmLoading: false,
  error: undefined,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
      state.films = genre === DEFAULT_GENRE
        ? state.allFilms
        : state.allFilms.filter((film) => film.genre === genre);
    })
    .addCase(fetchFilms.pending, (state) => {
      state.isFilmsLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.allFilms = state.films;
      state.isFilmsLoading = false;
    })
    .addCase(fetchCurrentFilm.pending, (state) => {
      state.isCurrentFilmLoading = true;
    })
    .addCase(fetchCurrentFilm.fulfilled, (state, action) => {
      state.currentFilm = action.payload;
      state.isCurrentFilmLoading = false;
    })
    .addCase(fetchPromo.fulfilled, (state, action) => {
      state.promo = action.payload;
    });
});
