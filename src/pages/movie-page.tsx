import {Logo} from '../components/logo.tsx';
import {Footer} from '../components/footer.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {Link, Navigate, useParams} from 'react-router-dom';
import {ROUTES} from '../routes/routes-data.ts';
import {MoviePageTabs} from '../components/movie-page-tabs.tsx';
import {CatalogFilmList} from '../components/catalog-film-list.tsx';
import {useAppSelector} from '../store/hooks.ts';

export const MoviePage = ({inList = false}: {inList?: boolean}) => {
  const {id} = useParams();
  const stateAllFilms = useAppSelector((state) => state.allFilms);
  const film = stateAllFilms.find((item) => item.id === id);

  if (!film) {
    return (<Navigate to={ROUTES.NOT_FOUND}/>);
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <HeaderUserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
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
                <Link to={ROUTES.REVIEW.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <MoviePageTabs film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CatalogFilmList
            genreFilter={film.genre}
            maxCountFilter={4}
            excludeFilmByIdFilter={film.id}
          />
        </section>

        <Footer/>
      </div>
    </>
  );
};
