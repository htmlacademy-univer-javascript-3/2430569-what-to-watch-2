import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name';
import {FilmCard} from './film-card';
import {filmsMock} from '../../mocks/films-mock.ts';
import userMock from '../../mocks/user-mock.ts';

const mockStore = configureMockStore();
const filmMock = filmsMock[0];
describe('FilmCard Component', () => {
  const initialState = {
    [ReducerName.Auth]: {
      authStatus: AuthStatus.Auth,
      userData: userMock,
      favoriteCount: 0
    },
    [ReducerName.Main]: {
      error: null,
      promo: filmMock,
      isPromoLoading: false,
    },
  };

  it('render the film card with correct details', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={filmMock}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(filmMock.name)).toBeInTheDocument();
    expect(screen.getByText(filmMock.genre)).toBeInTheDocument();
    expect(screen.getByText(filmMock.released)).toBeInTheDocument();
  });
});
