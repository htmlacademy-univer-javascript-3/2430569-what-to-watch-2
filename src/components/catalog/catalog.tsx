import {CatalogGenreList} from '../catalog-genre-list/catalog-genre-list.tsx';
import {CatalogFilmList} from '../catalog-film-list/catalog-film-list.tsx';
import {useAppSelector} from '../../store/hooks.ts';
import {memo, useCallback, useEffect, useState} from 'react';
import {ReducerName} from '../../types/reducer-name.ts';

interface Props {
  withoutGenres?: boolean;
  withoutShowMoreButton?: boolean;
}

const CatalogShowMoreButtonComponent = ({onClick} : {onClick: () => void}) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
  </div>
);

const CatalogShowMoreButton = memo(CatalogShowMoreButtonComponent);

const CatalogComponent = ({withoutGenres = false, withoutShowMoreButton = false}: Props) => {
  const LIST_LENGTH_STEP = 8;
  const stateFilms = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const [length, setLength] = useState(LIST_LENGTH_STEP);
  const handleButtonClick = useCallback(()=>{
    setLength((prev) => prev + LIST_LENGTH_STEP);
  },[]);

  useEffect(() => {
    setLength(withoutShowMoreButton ? stateFilms.length : LIST_LENGTH_STEP);
  }, [stateFilms, withoutShowMoreButton]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {!withoutGenres ? <CatalogGenreList/> : null}
      <CatalogFilmList maxCountFilter={length}/>
      {!withoutShowMoreButton && stateFilms.length > length ? <CatalogShowMoreButton onClick={handleButtonClick}/> : null}
    </section>
  );
};

export const Catalog = memo(CatalogComponent);
