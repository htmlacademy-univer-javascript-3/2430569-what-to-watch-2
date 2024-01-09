import { render, fireEvent, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Catalog } from './catalog';
import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import thunk from 'redux-thunk';
import { Genre } from '../../types/genre';
import {filmsMock} from '../../mocks/films-mock.ts';

const mockStore = configureMockStore<State>([thunk]);

describe('Catalog Component', () => {
  it('render without errors', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: filmsMock,
        isFilmsLoading: false,
        films: filmsMock,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(24);
  });

  it('should handle "Show more" button click', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: filmsMock,
        isFilmsLoading: false,
        films: filmsMock,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const linksBefore = screen.getAllByRole('link');
    expect(linksBefore.length).toEqual(24);

    const showMoreButton = screen.getByRole('button');
    fireEvent.click(showMoreButton);

    const linksAfter = screen.getAllByRole('link');
    expect(linksAfter.length).toEqual(40);
  });
});
