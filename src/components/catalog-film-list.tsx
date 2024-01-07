
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {Film} from '../mocks/films.ts';
import {useState} from 'react';

export const CatalogFilmList = ({films}: {films: Film[]}) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };
  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {films.map((item) => (
        <CatalogFilmListElement
          film={item}
          key={item.id}
          isActive={activeFilm === item.id}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        />
      ))}
    </div>
  );
};
