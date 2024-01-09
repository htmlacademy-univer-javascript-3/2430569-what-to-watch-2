import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {ReducerName} from '../../types/reducer-name.ts';
import {Genre} from '../../types/genre.ts';
import {CatalogGenreList} from './catalog-genre-list.tsx';

const mockStore = configureMockStore([thunk]);

const mockGenres = [
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Drama' },
  { id: 3, genre: 'Action' },
];

const initialState = {
  [ReducerName.Main]: {
    currentGenre: Genre.DefaultGenre,
    films: mockGenres,
  },
};

describe('GenreList Component', () => {
  it('render all genres from CatalogGenreList', () => {
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogGenreList />
        </Provider>
      </MemoryRouter>
    );

    const genres = screen.getAllByRole('listitem');

    expect(genres).toHaveLength(3);
  });
});
