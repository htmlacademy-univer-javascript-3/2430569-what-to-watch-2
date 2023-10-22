import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/film-card.tsx';
import {filmCardData} from '../data/film-card-data.ts';

export const Main = () => (
  <>
    <FilmCard filmCard={filmCardData}/>
    <div className="page-content">
      <Catalog/>
      <Footer/>
    </div>
  </>
);
