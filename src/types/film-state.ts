import {Film} from './film.ts';
import {Review} from './review.ts';

export interface FilmState {
  film: Film | null;
  reviews: Review[];
  similar: Film[];
  isLoading: boolean;
}
