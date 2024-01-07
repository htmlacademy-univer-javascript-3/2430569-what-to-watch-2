import {AppRouter} from './routes/app-router.tsx';
import {Film} from './mocks/films.ts';

export const App = ({films}: {films: Film[]}) => (
  <AppRouter films={films}/>
);
