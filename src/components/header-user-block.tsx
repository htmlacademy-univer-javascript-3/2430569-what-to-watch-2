import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {logout} from '../store/api-actions.ts';
import {AuthStatus} from '../types/auth-status.ts';
import {Link} from 'react-router-dom';
import {RoutesData} from '../routes/routes-data.ts';
import {memo} from 'react';

const HeaderUserBlockComponent = () => {
  const stateAuthStatus = useAppSelector((state) => state[ReducerName.Auth].authStatus);
  const stateUser = useAppSelector((state) => state[ReducerName.Auth].user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <ul className="user-block">
      {
        stateAuthStatus === AuthStatus.Auth && (
          <li className="user-block__item">
            <Link to={RoutesData.MyList}>
              <div className="user-block__avatar">
                <img src={stateUser?.avatarUrl} alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
          </li>
        )
      }
      <li className="user-block__item">
        {stateAuthStatus === AuthStatus.Auth ?
          (<Link to={RoutesData.Main} onClick={handleLogoutClick} className="user-block__link">Sign out</Link>) :
          (<Link to={RoutesData.SignIn} className="user-block__link">Sign in</Link>)}
      </li>
    </ul>
  );
};

export const HeaderUserBlock = memo(HeaderUserBlockComponent);
