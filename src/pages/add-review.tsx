import {Logo} from '../components/logo.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {ROUTES} from '../routes/routes-data.ts';
import {Link, Navigate, useParams} from 'react-router-dom';
import {AddReviewForm} from '../components/add-review-form.tsx';
import {useAppSelector} from '../store/hooks.ts';

export const AddReview = () => {
  const {id} = useParams();
  const stateAllFilms = useAppSelector((state) => state.allFilms);
  const film = stateAllFilms.find((item) => item.id === id);

  if (!film) {
    return (<Navigate to={ROUTES.NOT_FOUND}/>);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={ROUTES.FILM.replace(':id', film.id)} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={ROUTES.REVIEW.replace(':id', film.id)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <HeaderUserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>

    </section>
  );
};
