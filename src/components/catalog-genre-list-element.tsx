import {useAppDispatch} from '../store/hooks.ts';
import {setGenre} from '../store/actions.ts';
import {FormEvent, useCallback} from 'react';
import {Link} from 'react-router-dom';

export const CatalogGenreListElement = ({genre, isActive = false}: {genre: string; isActive: boolean}) => {
  const appDispatch = useAppDispatch();
  const handleClick = useCallback(
    (event: FormEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      appDispatch(setGenre(genre));
    },
    [appDispatch, genre]
  );
  return (
    <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
      <Link to="#" className="catalog__genres-link" onClick={handleClick}>{genre}</Link>
    </li>
  );
};
