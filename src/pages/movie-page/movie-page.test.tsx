import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {State} from '../../types/state';
import {ReducerName} from '../../types/reducer-name';
import {AuthStatus} from '../../types/auth-status.ts';
import {RoutesData} from '../../routes/routes-data.ts';
import {MoviePage} from './movie-page.tsx';
import {createAxios} from '../../services/api.ts';
import {filmsMock} from '../../mocks/films-mock.ts';
import userMock from '../../mocks/user-mock.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const film = filmsMock[0];
const similar = filmsMock[1];

describe('FilmPage Component', () => {
  it('Should render loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: true,
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<MoviePage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByText('SPINNER');
    expect(spinner).toBeInTheDocument();
  });

  it('Should render 404 page when film', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: false,
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', 'bebra')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<MoviePage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 NOT FOUND/)).toBeInTheDocument();
  });

  it('Should render film page with film data', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: film,
        isLoading: false,
        similar: [similar],
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.Auth,
        user: userMock,
      },
      [ReducerName.Main]: {
        favoriteCount: 0,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<MoviePage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const filmTitle = screen.getByText(film.name);
      expect(filmTitle).toBeInTheDocument();
    });

    const similarFilm1 = screen.getByText(similar.name);
    expect(similarFilm1).toBeInTheDocument();
  });
});
