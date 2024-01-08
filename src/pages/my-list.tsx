import {Footer} from '../components/footer.tsx';
import {Logo} from '../components/logo.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {Catalog} from '../components/catalog.tsx';

export const MyList = () => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo/>
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      <HeaderUserBlock/>
    </header>
    <Catalog withoutGenres withoutShowMoreButton/>
    <Footer/>
  </div>
);
