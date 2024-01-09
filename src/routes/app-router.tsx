import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RoutesData} from './routes-data.ts';
import {Main} from '../pages/main.tsx';
import {SignIn} from '../pages/sign-in.tsx';
import {MyList} from '../pages/my-list.tsx';
import {MoviePage} from '../pages/movie-page.tsx';
import {AddReview} from '../pages/add-review.tsx';
import {Player} from '../pages/player.tsx';
import {NotFoundPage} from '../pages/not-found-page.tsx';
import {PrivateRoute} from './private-route.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutesData.Main} element={<Main/>}/>
      <Route path={RoutesData.SignIn} element={<SignIn/>}/>
      <Route path={RoutesData.MyList} element={<PrivateRoute><MyList/></PrivateRoute>}/>
      <Route path={RoutesData.Films}>
        <Route path={RoutesData.Film} element={<MoviePage/>}/>
        <Route path={RoutesData.Review} element={<PrivateRoute><AddReview/></PrivateRoute>}/>
      </Route>
      <Route path={RoutesData.Player} element={<Player/>}/>
      <Route path={RoutesData.NotFound} element={<NotFoundPage/>}/>
    </Routes>
  </BrowserRouter>
);
