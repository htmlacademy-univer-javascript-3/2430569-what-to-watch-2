import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/film-card.tsx';
import {FILM_LIST} from '../mocks/films.ts';

export const Main = () => (
  <>
    <FilmCard film={FILM_LIST[0]}/>
    <div className="page-content">
      <Catalog/>
      <Footer/>
    </div>
  </>
);
