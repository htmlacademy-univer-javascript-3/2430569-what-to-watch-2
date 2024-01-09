import {Footer} from '../../components/footer/footer.tsx';
import {Catalog} from '../../components/catalog/catalog.tsx';
import {FilmCard} from '../../components/film-card/film-card.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {memo, useLayoutEffect} from 'react';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {fetchPromo} from '../../store/api-actions.ts';
import {ReducerName} from '../../types/reducer-name.ts';

const MainComponent = () => {
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

export const Main = memo(MainComponent);
