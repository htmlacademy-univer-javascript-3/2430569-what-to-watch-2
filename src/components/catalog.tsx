import {CatalogGenreList} from './catalog-genre-list.tsx';
import {CatalogFilmList} from './catalog-film-list.tsx';

interface Props {
  withoutGenres?: boolean;
  withoutShowMoreButton?: boolean;
}

const CatalogShowMoreButton = () => (
  <div className="catalog__more">
    <button className="catalog__button" type="button">Show more</button>
  </div>
);

export const Catalog = ({withoutGenres = false, withoutShowMoreButton = false}: Props) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    {!withoutGenres ? <CatalogGenreList/> : null}
    <CatalogFilmList maxCountFilter={8}/>
    {!withoutShowMoreButton ? <CatalogShowMoreButton/> : null}
  </section>
);
