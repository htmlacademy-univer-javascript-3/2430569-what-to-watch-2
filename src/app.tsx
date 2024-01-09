import {AppRouter} from './routes/app-router.tsx';
import {BrowserRouter} from 'react-router-dom';

export const App = () => (
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>
);
