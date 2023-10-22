import {CatalogGenreListElement} from './catalog-genre-list-element.tsx';
import {Genre} from '../data/genres-data.ts';

export const CatalogGenreList = ({ genres }: { genres: Genre[] }) => (
  <ul className="catalog__genres-list">
    {genres.map((item) => (
      <CatalogGenreListElement genre={item} key={item.name} />
    ))}
  </ul>
);

