import {Film} from '../types/film.ts';
import {memo} from 'react';

const DetailsItem = ({header, description}: {header: string; description: string}) => (
  <p className="film-card__details-item">
    <strong className="film-card__details-name">{header}</strong>
    <span className="film-card__details-value">{description}</span>
  </p>
);

const MoviePageTabDetailsComponent = ({film}: {film: Film}) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <DetailsItem header="Director" description={film.director}/>
      <DetailsItem header="Starring" description={film.starring.join(', ')}/>
    </div>

    <div className="film-card__text-col">
      <DetailsItem header="Run Time" description={`${(film.runTime / 60).toFixed(0)}h ${film.runTime % 60}m`}/>
      <DetailsItem header="Genre" description={film.genre}/>
      <DetailsItem header="Released" description={`${film.released}`}/>
    </div>
  </div>
);

export const MoviePageTabDetails = memo(MoviePageTabDetailsComponent);
