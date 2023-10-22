import {Link} from 'react-router-dom';
import {routes} from '../routes/routes-data.ts';

export const Logo = ({light = false}: {light?: boolean}) => (
  <div className="logo">
    <Link to={routes.MAIN} className={`logo__link${light ? ' logo__link--light' : ''}`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);
