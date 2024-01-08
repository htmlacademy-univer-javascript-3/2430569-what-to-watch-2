import {CatalogGenreListElement} from './catalog-genre-list-element.tsx';
import {DEFAULT_GENRE} from '../store/reducer.ts';
import {useMemo} from 'react';
import {useAppSelector} from '../store/hooks.ts';

export const CatalogGenreList = () => {
  const stateAllFilms = useAppSelector((state) => state.allFilms);
  const stateGenre = useAppSelector((state) => state.genre);
  const genreList = useMemo(() => [DEFAULT_GENRE, ...new Set(stateAllFilms.map((film) => film.genre))], [stateAllFilms]);

  return (
    <ul className="catalog__genres-list">
      {genreList.map((item) => (
        <CatalogGenreListElement genre={item} isActive={item === stateGenre} key={item} />
      ))}
    </ul>
  );
};

