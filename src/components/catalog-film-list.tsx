
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {useState} from 'react';
import {useAppSelector} from '../store/hooks.ts';
import {Spinner} from './spinner.tsx';
import {ReducerName} from '../types/reducer-name.ts';

interface Props {
  genreFilter?: string;
  maxCountFilter: number;
  excludeFilmByIdFilter?: string;
}

export const CatalogFilmList = (props: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const stateFilms = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const stateAllFilms = useAppSelector((state) => state[ReducerName.Main].films);
  const stateIsFilmsLoading = useAppSelector((state) => state[ReducerName.Main].isFilmsLoading);

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
