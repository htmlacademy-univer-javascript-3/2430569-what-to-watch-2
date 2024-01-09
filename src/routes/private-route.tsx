import {Navigate} from 'react-router-dom';
import {JSX} from 'react';
import {ROUTES} from './routes-data.ts';
import {useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {AuthStatus} from '../types/auth-status.ts';

export const PrivateRoute = ({children}: {children: JSX.Element}) => (
  useAppSelector((state) => state[ReducerName.Auth].authStatus) === AuthStatus.AUTH ?
    children :
    <Navigate to={ROUTES.SING_IN}/>
);
