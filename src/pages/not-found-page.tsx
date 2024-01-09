import {RoutesData} from '../routes/routes-data.ts';
import {Link} from 'react-router-dom';
import {memo} from 'react';

const NotFoundPageComponent = () => (
  <>
    <h1>404 NOT FOUND</h1>
    <Link to={RoutesData.Main}>main</Link>
  </>);

export const NotFoundPage = memo(NotFoundPageComponent);
