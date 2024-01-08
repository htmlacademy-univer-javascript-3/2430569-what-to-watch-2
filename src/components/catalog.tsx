import {CatalogGenreList} from './catalog-genre-list.tsx';
import {CatalogFilmList} from './catalog-film-list.tsx';
import {genres} from '../mocks/genres-data.ts';
import {Film} from '../mocks/films.ts';

interface Props {
  films: Film[];
  withoutGenres?: boolean;
  withoutShowMoreButton?: boolean;
}

const CatalogShowMoreButton = () => (
  <div className="catalog__more">
    <button className="catalog__button" type="button">Show more</button>
  </div>
);

export const Catalog = ({films, withoutGenres = false, withoutShowMoreButton = false}: Props) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    {!withoutGenres ? <CatalogGenreList genres={genres}/> : null}
    <CatalogFilmList films={films} maxCountFilter={8}/>
    {!withoutShowMoreButton ? <CatalogShowMoreButton/> : null}
  </section>
);
