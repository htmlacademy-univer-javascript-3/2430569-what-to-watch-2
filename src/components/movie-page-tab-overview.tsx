import {convertFilmRating} from '../utils/rating.ts';
import {Film} from '../types/film.ts';
import {memo} from 'react';

const MoviePageTabOverviewComponent = ({film}: {film: Film}) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{convertFilmRating(film.rating)}</span>
        <span className="film-rating__count">{film.scoresCount} ratings</span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{film.description}</p>

      <p className="film-card__director"><strong>Director: {film.director}</strong></p>

      <p className="film-card__starring">
        <strong>
          Starring: {`${film.starring.join(', ')}`} and other
        </strong>
      </p>
    </div>
  </>
);

export const MoviePageTabOverview = memo(MoviePageTabOverviewComponent);
