import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducer-name';
import { dropToken, saveToken } from '../../services/token';
import {AuthStatus} from '../../types/auth-status.ts';
import {login, logout} from '../api-actions.ts';
import {AuthState} from '../../types/auth-state.ts';

const initialAuthState: AuthState = {
  authStatus: AuthStatus.NoAuth,
  user: null,
};

export const authReducer = createSlice({
  name: ReducerName.Auth,
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authStatus = AuthStatus.Auth;
      });
  },
}).reducer;
