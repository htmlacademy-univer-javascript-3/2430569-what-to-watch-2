import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducer-name';
import { dropToken, saveToken } from '../../services/token';
import {User} from '../../types/user.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {checkAuth, login, logout} from '../api-actions.ts';
interface AuthState {
  user: User | null;
  authStatus: AuthStatus;
}

const initialAuthState: AuthState = {
  authStatus: AuthStatus.NO_AUTH,
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
        state.authStatus = AuthStatus.NO_AUTH;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authStatus = AuthStatus.AUTH;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthStatus.AUTH;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NO_AUTH;
      });
  },
}).reducer;