import {AuthStatus} from '../../types/auth-status';
import {AuthState} from '../../types/auth-state.ts';
import {login, logout} from '../api-actions.ts';
import {authReducer} from './auth-reducer.ts';
import mockUser from '../../mocks/user-mock.ts';

describe('auth-reducer', () => {
  let state: AuthState;

  beforeEach(() => {
    state = {
      authStatus: AuthStatus.NoAuth,
      user: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(authReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authStatus: AuthStatus.NoAuth,
        user: null
      });
  });

  it('should set auth status', () => {
    const newAuthStatus = AuthStatus.Auth;
    const newState = authReducer(state, {type: login.fulfilled.type, payload: mockUser});
    expect(newState.authStatus).toEqual(newAuthStatus);
    expect(newState.user).toEqual(mockUser);
  });

  it('should set no auth status', () => {
    const newAuthStatus = AuthStatus.NoAuth;
    const newUser = null;
    const startState: AuthState = {
      authStatus: AuthStatus.Auth,
      user: mockUser,
    };
    const newState = authReducer(startState , {type: logout.fulfilled.type});
    expect(newState.authStatus).toEqual(newAuthStatus);
    expect(newState.user).toEqual(newUser);
  });
});
