import {Logo} from '../../components/logo/logo.tsx';
import {Footer} from '../../components/footer/footer.tsx';
import {HeaderUserBlock} from '../../components/header-user-block/header-user-block.tsx';
import {useParams} from 'react-router-dom';
import {MoviePageTabs} from '../../components/movie-page-tabs/movie-page-tabs.tsx';
import {CatalogFilmList} from '../../components/catalog-film-list/catalog-film-list.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {fetchFilm, fetchReviews, fetchSimilar} from '../../store/api-actions.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {memo, useLayoutEffect} from 'react';
import {FilmCardButtons} from '../../components/film-card-buttons/film-card-buttons.tsx';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';

const MAX_COUNT_SIMILAR_FILMS = 4;

const MoviePageComponent = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const stateCurrentFilm = useAppSelector((state) => state[ReducerName.Film].film);
  const stateIsCurrentFilmLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);
  const similar = useAppSelector((state) => state[ReducerName.Film].similar);


  useLayoutEffect(() => {
    if (id && id !== stateCurrentFilm?.id) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilar(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch, stateCurrentFilm?.id]);

  if (stateIsCurrentFilmLoading) {
    return (<Spinner/>);
  }

  if (!stateCurrentFilm) {
    return (<NotFoundPage/>);
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
              <FilmCardButtons film={stateCurrentFilm} withAddReviewButton/>
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
        {!!similar.length && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <CatalogFilmList list={similar} maxCountFilter={MAX_COUNT_SIMILAR_FILMS}/>
          </section>
        )}
        <Footer/>
      </div>
    </>
  );
};

export const MoviePage = memo(MoviePageComponent);
