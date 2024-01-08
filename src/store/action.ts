import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {Film, FilmListElement} from '../types/film.ts';

export const setGenre = createAction<{genre: string}>('setGenre');

export const fetchFilms = createAsyncThunk<
  FilmListElement[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/films', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmListElement[]>('/films');

  return data;
});

export const fetchCurrentFilm = createAsyncThunk<
  Film,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/films/id', async (filmId: string, { extra: api }) => {
  const { data } = await api.get<Film>(`/films/${filmId}`);
  return data;
});

export const fetchPromo = createAsyncThunk<
  Film,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/promo', async (_arg, { extra: api }) => {
  const { data } = await api.get<Film>('/promo');
  return data;
});
