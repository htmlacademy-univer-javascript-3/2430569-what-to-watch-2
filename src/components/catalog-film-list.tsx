
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {useState} from 'react';
import {useAppSelector} from '../store/hooks.ts';
import {Spinner} from './spinner.tsx';

interface Props {
  genreFilter?: string;
  maxCountFilter: number;
  excludeFilmByIdFilter?: string;
}

export const CatalogFilmList = (props: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const stateFilms = useAppSelector((state) => state.films);
  const stateAllFilms = useAppSelector((state) => state.allFilms);
  const stateIsFilmsLoading = useAppSelector((state) => state.isFilmsLoading);

  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };
  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filmList = props.genreFilter ?
    stateAllFilms.filter((item) => props.genreFilter === item.genre) :
    stateFilms;

  if (stateIsFilmsLoading) {
    return (<Spinner/>);
  }

  return (
    <div className="catalog__films-list">
      {filmList
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
