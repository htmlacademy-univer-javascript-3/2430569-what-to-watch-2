import {CatalogGenreList} from './catalog-genre-list.tsx';
import {CatalogFilmList} from './catalog-film-list.tsx';
import {useAppSelector} from '../store/hooks.ts';
import {memo, useCallback, useState} from 'react';
import {ReducerName} from '../types/reducer-name.ts';

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
  const stateFilms = useAppSelector((state) => state[ReducerName.Main].films);
  const [length, setLength] = useState(LIST_LENGTH_STEP);
  const handleClick = useCallback(()=>{
    setLength((prev) => prev + LIST_LENGTH_STEP);
  },[]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {!withoutGenres ? <CatalogGenreList/> : null}
      <CatalogFilmList maxCountFilter={length}/>
      {!withoutShowMoreButton && stateFilms.length > length ? <CatalogShowMoreButton onClick={handleClick}/> : null}
    </section>
  );
};

export const Catalog = memo(CatalogComponent);
