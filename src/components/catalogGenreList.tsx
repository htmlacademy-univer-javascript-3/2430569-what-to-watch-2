import {CatalogGenreListElement} from './catalogGenreListElement.tsx';
import {Genre} from '../data/genresData.ts';

export const CatalogGenreList = ({ genres }: { genres: Genre[] }) => (
  <ul className="catalog__genres-list">
    {genres.map((item) => (
      <CatalogGenreListElement genre={item} key={item.name} />
    ))}
  </ul>
);

