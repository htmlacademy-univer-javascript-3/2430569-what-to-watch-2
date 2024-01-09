import {User} from './user.ts';
import {AuthStatus} from './auth-status.ts';

export interface AuthState {
  user: User | null;
  authStatus: AuthStatus;
}
