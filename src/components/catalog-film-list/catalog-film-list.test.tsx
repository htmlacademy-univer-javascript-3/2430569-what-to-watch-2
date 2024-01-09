import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import {State} from '../../types/state.ts';
import {filmsMock} from '../../mocks/films-mock.ts';
import {CatalogFilmList} from './catalog-film-list.tsx';
import {ReducerName} from '../../types/reducer-name.ts';

const mockStore = configureMockStore<State>([thunk]);

describe('FilmsList Component', () => {
  it('render films correctly when loading is complete', () => {
    const store = mockStore({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      [ReducerName.Main]: {
        genreFilms: filmsMock,
        isFilmsLoading: false,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogFilmList maxCountFilter={2} />
        </Provider>
      </MemoryRouter>

    );

    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(4);
  });

  it('render loading spinner when films are loading', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: filmsMock,
        isFilmsLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <CatalogFilmList maxCountFilter={2} />
      </Provider>
    );

    const spinner = screen.getByText('SPINNER');
    expect(spinner).toBeInTheDocument();
  });
});
