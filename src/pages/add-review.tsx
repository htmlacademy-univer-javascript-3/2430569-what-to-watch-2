import {Logo} from '../components/logo.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {ROUTES} from '../routes/routes-data.ts';
import {Link, Navigate, useParams} from 'react-router-dom';
import {AddReviewForm} from '../components/add-review-form.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {fetchCurrentFilm} from '../store/action.ts';
import {Spinner} from '../components/spinner.tsx';

export const AddReview = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const stateCurrentFilm = useAppSelector((state) => state.currentFilm);
  const stateIsCurrentFilmLoading = useAppSelector((state) => state.isCurrentFilmLoading);

  if (id && id !== stateCurrentFilm?.id) {
    dispatch(fetchCurrentFilm(id));
  }

  if (stateIsCurrentFilmLoading) {
    return (<Spinner/>);
  }

  if (!stateCurrentFilm) {
    return (<Navigate to={ROUTES.NOT_FOUND}/>);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={stateCurrentFilm.backgroundImage} alt={stateCurrentFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={ROUTES.FILM.replace(':id', stateCurrentFilm.id)} className="breadcrumbs__link">{stateCurrentFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={ROUTES.REVIEW.replace(':id', stateCurrentFilm.id)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <HeaderUserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={stateCurrentFilm.posterImage} alt={stateCurrentFilm.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>

    </section>
  );
};
