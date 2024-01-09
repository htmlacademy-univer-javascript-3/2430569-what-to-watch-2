import {ROUTES} from '../routes/routes-data.ts';
import {Link} from 'react-router-dom';

export const NotFoundPage = () => (
  <>
    <h1>404 NOT FOUND</h1>
    <Link to={ROUTES.MAIN}>main</Link>
  </>);
