import {createAction} from '@reduxjs/toolkit';

const Action = {
  SetGenre: 'main/setGenre',
  SetError: 'main/setError',
};

export const setGenre = createAction(Action.SetGenre, (genre: string) => ({
  payload: genre,
}));
export const setError = createAction(
  Action.SetError,
  (error: string | null) => ({ payload: error })
);
