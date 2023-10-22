import {CatalogGenreList} from './catalog-genre-list.tsx';
import {CatalogFilmList} from './catalog-film-list.tsx';
import {genres} from '../data/genres-data.ts';
import {films} from '../data/data.ts';

export const Catalog = () => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <CatalogGenreList genres={genres}/>
    <CatalogFilmList films={films}/>
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </section>
);
