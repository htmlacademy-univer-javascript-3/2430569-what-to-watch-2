import {convertFilmRating} from '../utils/rating.ts';
import {Film} from '../types/film.ts';

export const MoviePageTabOverview = ({film}: {film: Film}) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{convertFilmRating(film.rating)}</span>
        <span className="film-rating__count">240 ratings</span>
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
