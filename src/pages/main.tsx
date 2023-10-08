import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/filmCard.tsx';
import {filmCardData} from '../data/filmCardData.ts';

export const Main = () => (
  <>
    <FilmCard filmCard={filmCardData}/>
    <div className="page-content">
      <Catalog/>
      <Footer/>
    </div>
  </>
);
