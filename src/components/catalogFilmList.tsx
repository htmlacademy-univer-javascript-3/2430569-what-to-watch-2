import {Film} from '../data/data.ts';
import {CatalogFilmListElement} from './catalogFilmListElement.tsx';

export const CatalogFilmList = ({films}: {films: Film[]}) => (
  <div className="catalog__films-list">
    {films.map((item) => (
      <CatalogFilmListElement film={item} key={item.name}/>
    ))}
  </div>
);
