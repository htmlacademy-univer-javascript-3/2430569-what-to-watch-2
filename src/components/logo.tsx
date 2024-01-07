import {Link} from 'react-router-dom';
import {ROUTES} from '../routes/routes-data.ts';

interface Props {
  light?: boolean;
}

export const Logo = ({light = false}: Props) => (
  <div className="logo">
    <Link to={ROUTES.MAIN} className={`logo__link${light ? ' logo__link--light' : ''}`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);
