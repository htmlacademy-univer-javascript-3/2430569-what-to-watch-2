import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film.ts';
import {User} from '../types/user.ts';
import {Review} from '../types/review.ts';

const Action = {
  SetGenre: 'main/setGenre',
  SetFilmsLoadStatus: 'main/setFilmsLoadStatus',
  SetFilms: 'main/setFilms',
  SetUser: 'main/setUser',
  SetAuthStatus: 'main/setAuthStatus',
  SetError: 'main/setError',
  SetReviews: 'main/setReviews',
};

export const setGenre = createAction(Action.SetGenre, (genre: string) => ({
  payload: genre,
}));
export const setFilmsLoadStatus = createAction(
  Action.SetFilmsLoadStatus,
  (status: boolean) => ({ payload: status })
);
export const setFilms = createAction(Action.SetFilms, (films: Film[]) => ({
  payload: films,
}));
export const setUser = createAction(Action.SetUser, (user: User | null) => ({
  payload: user,
}));
export const setAuthorizationStatus = createAction(
  Action.SetAuthStatus,
  (status: string) => ({ payload: status })
);
export const setError = createAction(
  Action.SetError,
  (error: string | null) => ({ payload: error })
);
export const setReviews = createAction(
  Action.SetReviews,
  (review: Review[]) => ({ payload: review })
);
