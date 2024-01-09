import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {logout} from '../store/api-actions.ts';
import {AuthStatus} from '../types/auth-status.ts';
import {Link} from 'react-router-dom';
import {ROUTES} from '../routes/routes-data.ts';

export const HeaderUserBlock = () => {
  const stateAuthStatus = useAppSelector((state) => state[ReducerName.Auth].authStatus);
  const stateUser = useAppSelector((state) => state[ReducerName.Auth].user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <ul className="user-block">
      {
        stateAuthStatus === AuthStatus.AUTH && (
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={stateUser?.avatarUrl} alt="User avatar" width="63" height="63"/>
            </div>
          </li>
        )
      }
      <li className="user-block__item">
        {stateAuthStatus === AuthStatus.AUTH ?
          (<Link to={ROUTES.MAIN} onClick={handleLogoutClick} className="user-block__link">Sign out</Link>) :
          (<Link to={ROUTES.SING_IN} className="user-block__link">Sign in</Link>)}
      </li>
    </ul>
  );
};

