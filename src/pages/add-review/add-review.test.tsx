import {createAxios} from '../../services/api.ts';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state.ts';
import {Action} from '@reduxjs/toolkit';
import {AddReview} from './add-review.tsx';
import {ReducerName} from '../../types/reducer-name.ts';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes,} from 'react-router-dom';
import {RoutesData} from '../../routes/routes-data.ts';
import {filmsMock} from '../../mocks/films-mock.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import userMock from '../../mocks/user-mock.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilm = filmsMock[0];

describe('AddReviewPage Component', () => {
  it('renders loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<AddReview/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByText(/SPINNER/);
    expect(spinner).toBeInTheDocument();
  });

  it('renders 404 page when film ID is not available', () => {
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
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', 'bebebebe')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<AddReview/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 NOT FOUND/)).toBeInTheDocument();

  });

  it('renders add review page with film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isLoading: false,
      },
      [ReducerName.Auth]: {
        authStatus: AuthStatus.NoAuth,
        user: userMock,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Review.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Review} element={<AddReview/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addReviewForm = screen.getByText(/Add review/);
    expect(addReviewForm).toBeInTheDocument();
  });
});
