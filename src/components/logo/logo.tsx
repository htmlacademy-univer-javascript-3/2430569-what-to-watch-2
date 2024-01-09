import {Link} from 'react-router-dom';
import {RoutesData} from '../../routes/routes-data.ts';
import {memo} from 'react';

interface Props {
  light?: boolean;
}

const LogoComponent = ({light = false}: Props) => (
  <div className="logo">
    <Link to={RoutesData.Main} className={`logo__link${light ? ' logo__link--light' : ''}`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export const Logo = memo(LogoComponent);
