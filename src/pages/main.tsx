import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/film-card.tsx';
import {Film} from '../mocks/films.ts';

export const Main = ({films}: {films: Film[]}) => (
  <>
    <FilmCard film={films[0]}/>
    <div className="page-content">
      <Catalog films={films}/>
      <Footer/>
    </div>
  </>
);
