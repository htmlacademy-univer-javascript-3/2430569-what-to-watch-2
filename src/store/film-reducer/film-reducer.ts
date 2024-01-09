import {createSlice} from '@reduxjs/toolkit';
import {ReducerName} from '../../types/reducer-name.ts';
import {fetchFilm, fetchReviews, fetchSimilar, setFavorite} from '../api-actions.ts';
import {FilmState} from '../../types/film-state.ts';

const initialFilmState: FilmState = {
  film: null,
  reviews: [],
  similar: [],
  isLoading: false,
};

export const filmReducer = createSlice({
  name: ReducerName.Film,
  initialState: initialFilmState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
}).reducer;
