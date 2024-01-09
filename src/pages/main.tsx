import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/film-card.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {useLayoutEffect} from 'react';
import {Spinner} from '../components/spinner.tsx';
import {fetchPromo} from '../store/api-actions.ts';
import {ReducerName} from '../types/reducer-name.ts';

export const Main = () => {
  const dispatch = useAppDispatch();
  const statePromo = useAppSelector((state) => state[ReducerName.Main].promo);

  useLayoutEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  if(!statePromo) {
    return <Spinner />;
  }

  return (
    <>
      <FilmCard film={statePromo}/>
      <div className="page-content">
        <Catalog/>
        <Footer/>
      </div>
    </>
  );
};
