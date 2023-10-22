import {Genre} from '../data/genres-data.ts';

export const CatalogGenreListElement = ({ genre }: { genre: Genre }) => (
  <li className={`catalog__genres-item ${genre.isActive ? 'catalog__genres-item--active' : ''}`}>
    <a href="#" className="catalog__genres-link">{genre.name}</a>
  </li>
);
