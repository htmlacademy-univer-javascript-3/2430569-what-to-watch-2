import {Film} from './film.ts';

export interface MainState {
  films: Film[];
  genreFilms: Film[];
  currentGenre: string;
  isFilmsLoading: boolean;
  error: null | string;
  promo: null | Film;
  favoriteFilms: Film[];
  favoriteCount: number;
}
