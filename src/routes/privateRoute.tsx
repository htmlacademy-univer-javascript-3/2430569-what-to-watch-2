import {Navigate} from 'react-router-dom';
import {JSX} from 'react';
import {routes} from './routesData.ts';

export const PrivateRoute = ({children, isAuth = false}: {children: JSX.Element; isAuth?: boolean}) => (
  isAuth ? children : <Navigate to={routes.SING_IN} />
);
