
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {Film} from '../mocks/films.ts';
import {useState} from 'react';

interface Props {
  films: Film[];
  genreFilter?: string;
  maxCountFilter: number;
  excludeFilmByIdFilter?: string;
}

export const CatalogFilmList = (props: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };
  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {props.films
        .filter((item) => !props.genreFilter || props.genreFilter === item.genre)
        .filter((item) => !props.excludeFilmByIdFilter || props.excludeFilmByIdFilter !== item.id)
        .map((item) => (
          <CatalogFilmListElement
            film={item}
            key={item.id}
            isActive={activeFilm === item.id}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          />
        ))
        .slice(0, props.maxCountFilter)}
    </div>
  );
};
