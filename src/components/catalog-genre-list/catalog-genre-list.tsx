import {CatalogGenreListElement} from '../catalog-genre-list-element/catalog-genre-list-element.tsx';
import {memo, useMemo} from 'react';
import {useAppSelector} from '../../store/hooks.ts';
import {Genre} from '../../types/genre.ts';
import {ReducerName} from '../../types/reducer-name.ts';

const CatalogGenreListComponent = () => {
  const stateAllFilms = useAppSelector((state) => state[ReducerName.Main].films);
  const stateGenre = useAppSelector((state) => state[ReducerName.Main].currentGenre);
  const genreList = useMemo(() => [Genre.DefaultGenre, ...new Set(stateAllFilms.map((film) => film.genre))], [stateAllFilms]);

  return (
    <ul className="catalog__genres-list">
      {genreList.map((item) => (
        <CatalogGenreListElement genre={item} isActive={item === stateGenre} key={item} />
      ))}
    </ul>
  );
};

export const CatalogGenreList = memo(CatalogGenreListComponent);
