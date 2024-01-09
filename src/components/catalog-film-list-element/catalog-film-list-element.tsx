import {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {RoutesData} from '../../routes/routes-data.ts';
import {VideoPlayer} from '../video-player/video-player.tsx';
import {FilmListElement} from '../../types/film.ts';

interface Props {
  film: FilmListElement;
  isActive?: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}
const CatalogFilmListElementComponent = (props: Props) => {
  const handleMouseEnter = useCallback(() => {
    props.onMouseEnter(props.film.id);
  }, [props]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={props.onMouseLeave}
      data-active={props.isActive}
    >
      <Link to={RoutesData.Film.replace(':id', props.film.id)}>
        <div className="small-film-card__image">
          {props.isActive ? (
            <VideoPlayer src={props.film.previewVideoLink} poster={props.film.previewImage} />
          ) : (
            <img src={props.film.previewImage} alt={props.film.name} width="280" height="175"/>
          )}
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link to={RoutesData.Film.replace(':id', props.film.id)} className="small-film-card__link">{props.film.name}</Link>
      </h3>
    </article>
  );
};

export const CatalogFilmListElement = memo(CatalogFilmListElementComponent);
