import {Logo} from './logo.tsx';
import {HeaderUserBlock} from './header-user-block.tsx';
import {Film} from '../types/film.ts';
import {memo} from 'react';
import {FilmCardButtons} from './film-card-buttons.tsx';
import {NotFoundPage} from '../pages/not-found-page.tsx';

const FilmCardComponent = ({film}: {film: Film | undefined}) => {


  if (!film) {
    return (<NotFoundPage/>);
  }


  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo/>
        <HeaderUserBlock/>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={film.posterImage} alt={film.name} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <FilmCardButtons film={film}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FilmCard = memo(FilmCardComponent);
