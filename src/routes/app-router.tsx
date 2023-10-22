import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from './routes-data.ts';
import {Main} from '../pages/main.tsx';
import {SignIn} from '../pages/signIn.tsx';
import {MyList} from '../pages/my-list.tsx';
import {MoviePage, MoviePageState} from '../pages/movie-page.tsx';
import {AddReview} from '../pages/add-review.tsx';
import {Player} from '../pages/player.tsx';
import {NotFoundPage} from '../pages/not-found-page.tsx';
import {PrivateRoute} from './private-route.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.MAIN} element={<Main/>}/>
      <Route path={routes.SING_IN} element={<SignIn/>}/>
      <Route path={routes.MY_LIST} element={<PrivateRoute><MyList/></PrivateRoute>}/>
      <Route path={routes.FILMS}>
        <Route path={routes.FILM} element={<MoviePage currentState={MoviePageState.OVERVIEW}/>}/>
        <Route path={routes.REVIEW} element={<PrivateRoute><AddReview/></PrivateRoute>}/>
      </Route>
      <Route path={routes.PLAYER} element={<Player/>}/>
      <Route path={routes.NOT_FOUND} element={<NotFoundPage/>}/>
    </Routes>
  </BrowserRouter>
);
