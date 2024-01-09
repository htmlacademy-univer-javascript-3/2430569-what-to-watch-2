
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {memo, useState} from 'react';
import {useAppSelector} from '../store/hooks.ts';
import {Spinner} from './spinner/spinner.tsx';
import {ReducerName} from '../types/reducer-name.ts';
import {Film} from '../types/film.ts';

interface Props {
  maxCountFilter?: number;
  list?: Film[];
}

const CatalogFilmListComponent = (props: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const stateFilms = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const stateIsFilmsLoading = useAppSelector((state) => state[ReducerName.Main].isFilmsLoading);

  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };
  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filmList = props.list ? props.list : stateFilms;

  if (!props.list && stateIsFilmsLoading) {
    return (<Spinner/>);
  }

  return (
    <div className="catalog__films-list">
      {filmList
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

export const CatalogFilmList = memo(CatalogFilmListComponent);
