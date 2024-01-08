import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {createAxios} from '../services/api.ts';

export const axios = createAxios();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
    }),
});
