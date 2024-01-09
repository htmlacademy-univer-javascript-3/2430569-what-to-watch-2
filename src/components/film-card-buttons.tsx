import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {Link, useNavigate} from 'react-router-dom';
import {RoutesData} from '../routes/routes-data.ts';
import {memo} from 'react';
import {AuthStatus} from '../types/auth-status.ts';
import {fetchFavoriteFilms, setFavorite} from '../store/api-actions.ts';
import {Film} from '../types/film.ts';
import {Icon} from './icon/icon.tsx';
import {ICONS} from './icon/icons.ts';

const FilmCardButtonsComponent = ({film, withAddReviewButton = false}: {film: Film; withAddReviewButton?: boolean}) => {
  const stateFavoriteCount = useAppSelector((state) => state[ReducerName.Main].favoriteCount);
  const stateAuthStatus = useAppSelector((state) => state[ReducerName.Auth].authStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = stateAuthStatus === AuthStatus.Auth;

  const handleClickPlay = () => {
    navigate(RoutesData.Player.replace(':id', film.id));
  };
  const handleClickMyList = () => {
    if (!isAuth) {
      navigate(RoutesData.SignIn);
    } else {
      dispatch(setFavorite({status: !film.isFavorite, filmId: film.id}));
      dispatch(fetchFavoriteFilms());
    }
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handleClickPlay}>
        <Icon {...ICONS.PLAY_START}/>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={handleClickMyList}>
        {isAuth && film.isFavorite ? <Icon {...ICONS.IN_LIST}/> : <Icon {...ICONS.ADD}/>}
        <span>My list</span>
        <span className="film-card__count">{isAuth ? stateFavoriteCount : 0}</span>
      </button>
      {
        withAddReviewButton && isAuth &&
        <Link to={RoutesData.Review.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
      }
    </div>
  );
};

export const FilmCardButtons = memo(FilmCardButtonsComponent);
