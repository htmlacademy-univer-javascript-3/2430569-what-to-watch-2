import {Footer} from '../components/footer.tsx';
import {Catalog} from '../components/catalog.tsx';
import {FilmCard} from '../components/film-card.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {useLayoutEffect} from 'react';
import {fetchPromo} from '../store/action.ts';
import {Spinner} from '../components/spinner.tsx';

export const Main = () => {
  const dispatch = useAppDispatch();
  const promo = useAppSelector((state) => state.promo);

  useLayoutEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  if(!promo) {
    return <Spinner />;
  }

  return (
    <>
      <FilmCard film={promo}/>
      <div className="page-content">
        <Catalog/>
        <Footer/>
      </div>
    </>
  );
};
