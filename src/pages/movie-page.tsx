import {Logo} from '../components/logo.tsx';
import {Footer} from '../components/footer.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {Link, Navigate, useParams} from 'react-router-dom';
import {ROUTES} from '../routes/routes-data.ts';
import {MoviePageTabs} from '../components/movie-page-tabs.tsx';
import {CatalogFilmList} from '../components/catalog-film-list.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {Spinner} from '../components/spinner.tsx';
import {fetchFilm} from '../store/api-actions.ts';
import {ReducerName} from '../types/reducer-name.ts';

export const MoviePage = ({inList = false}: {inList?: boolean}) => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const stateCurrentFilm = useAppSelector((state) => state[ReducerName.Film].film);
  const stateIsCurrentFilmLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);

  if (id && id !== stateCurrentFilm?.id) {
    dispatch(fetchFilm(id));
  }

  if (stateIsCurrentFilmLoading) {
    return (<Spinner/>);
  }

  if (!stateCurrentFilm) {
    return (<Navigate to={ROUTES.NOT_FOUND}/>);
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={stateCurrentFilm.backgroundImage} alt={stateCurrentFilm.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <HeaderUserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{stateCurrentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{stateCurrentFilm.genre}</span>
                <span className="film-card__year">{stateCurrentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={inList ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={ROUTES.REVIEW.replace(':id', stateCurrentFilm.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={stateCurrentFilm.posterImage} alt={stateCurrentFilm.name} width="218" height="327"/>
            </div>

            <MoviePageTabs film={stateCurrentFilm}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CatalogFilmList
            genreFilter={stateCurrentFilm.genre}
            maxCountFilter={4}
            excludeFilmByIdFilter={stateCurrentFilm.id}
          />
        </section>

        <Footer/>
      </div>
    </>
  );
};
