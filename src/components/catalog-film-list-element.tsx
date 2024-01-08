import {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../routes/routes-data.ts';
import {VideoPlayer} from './video-player.tsx';
import {FilmListElement} from '../types/film.ts';

interface Props {
  film: FilmListElement;
  isActive?: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}
export const CatalogFilmListElement = (props: Props) => {
  const handleMouseEnter = useCallback(() => {
    props.onMouseEnter(props.film.id);
  }, [props.film.id, props.onMouseEnter]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={props.onMouseLeave}
      data-active={props.isActive}
    >
      <div className="small-film-card__image">
        {props.isActive ? (
          <VideoPlayer src={props.film.previewVideoLink} poster={props.film.previewImage} />
        ) : (
          <img src={props.film.previewImage} alt={props.film.name} width="280" height="175"/>
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link to={ROUTES.FILM.replace(':id', props.film.id)} className="small-film-card__link">{props.film.name}</Link>
      </h3>
    </article>
  );
};
