import {Footer} from '../components/footer.tsx';
import {Logo} from '../components/logo.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {memo} from 'react';
import {useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {CatalogFilmList} from '../components/catalog-film-list.tsx';

const MyListComponent = () => {
  const stateFavoriteCount = useAppSelector((state) => state[ReducerName.Main].favoriteCount);
  const stateFavoriteFilms = useAppSelector((state) => state[ReducerName.Main].favoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{stateFavoriteCount}</span></h1>
        <HeaderUserBlock/>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <CatalogFilmList list={stateFavoriteFilms}/>
      </section>
      <Footer/>
    </div>
  );
};

export const MyList = memo(MyListComponent);
