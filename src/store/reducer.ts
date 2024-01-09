import {combineReducers} from '@reduxjs/toolkit';
import {ReducerName} from '../types/reducer-name.ts';
import {filmReducer} from './film-reducer/film-reducer.ts';
import {mainReducer} from './main-reducer/main-reducer.ts';
import {authReducer} from './auth-reducer/auth-reducer.ts';

export const reducer = combineReducers({
  [ReducerName.Film]: filmReducer,
  [ReducerName.Main]: mainReducer,
  [ReducerName.Auth]: authReducer
});
