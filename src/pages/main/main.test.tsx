import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {Main} from './main.tsx';
import {ReducerName} from '../../types/reducer-name.ts';
import {createAxios} from '../../services/api.ts';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state.ts';
import {filmsMock} from '../../mocks/films-mock.ts';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AuthStatus} from '../../types/auth-status.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('Main', () => {
  test('renders Spinner while fetching promo', async () => {
    const store = mockStore({
      [ReducerName.Main]: {
        promo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<Main/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('SPINNER')).toBeInTheDocument();
    await waitFor(() => screen.getByText('SPINNER') === null);
  });

  test('renders FilmCard, Catalog, and Footer after fetching promo', async () => {
    const store = mockStore({
      [ReducerName.Main]: {
        promo: filmsMock[0],
        genreFilms: [filmsMock[1]],
        films: [filmsMock[1]],
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<Main/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(filmsMock[0].name)).toBeInTheDocument();
      expect(screen.getByText('Catalog')).toBeInTheDocument();
    });
  });
});
