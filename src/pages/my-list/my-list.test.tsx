import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {MyList} from './my-list.tsx';
import {ReducerName} from '../../types/reducer-name';
import {createAxios} from '../../services/api.ts';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state.ts';
import {filmsMock} from '../../mocks/films-mock.ts';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AuthStatus} from '../../types/auth-status.ts';
import userMock from '../../mocks/user-mock.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('MyList', () => {
  test('renders MyList component with the correct title and film count', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteCount: filmsMock.length,
        favoriteFilms: filmsMock,
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.Auth,
        user: userMock,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<MyList/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(`${filmsMock.length}`)).toBeInTheDocument();
  });

  test('renders somepage without auth', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteCount: filmsMock.length,
        favoriteFilms: filmsMock,
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.NoAuth,
        user: userMock,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<div>Some page</div>}/>
            <Route path="*" element={<MyList/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Some page')).toBeInTheDocument();
    expect(screen.queryByText('My list')).not.toBeInTheDocument();
    expect(screen.queryByText(`${filmsMock.length}`)).not.toBeInTheDocument();
  });

  test('renders child components: HeaderUserBlock, CatalogFilmList', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteCount: 0,
        favoriteFilms: [],
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.Auth,
        user: userMock,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<MyList/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
