import {Film, FILM_LIST} from '../mocks/films.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setGenre} from './action.ts';

export const DEFAULT_GENRE = 'All genres';

interface AppState {
  genre: string;
  films: Film[];
  allFilms: Film[];
}

const initialState: AppState = {
  genre: DEFAULT_GENRE,
  films: FILM_LIST,
  allFilms: FILM_LIST,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    const { genre } = action.payload;
    state.genre = genre;
    state.films = genre === DEFAULT_GENRE
      ? state.allFilms
      : state.allFilms.filter((film) => film.genre === genre);
  });
});
