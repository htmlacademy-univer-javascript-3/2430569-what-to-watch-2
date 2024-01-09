import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {ReducerName} from '../../types/reducer-name.ts';
import {CatalogGenreListElement} from './catalog-genre-list-element.tsx';
import {setGenre} from '../../store/actions.ts';

const mockStore = configureMockStore([thunk]);

describe('CatalogGenreListElement', () => {
  it('render CatalogGenreListElement', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Action',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogGenreListElement genre="Action" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Action');

    expect(genreLink).toBeInTheDocument();
  });

  it('handle click CatalogGenreListElement', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Drama',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogGenreListElement genre="Drama" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Drama');
    fireEvent.click(genreLink);

    const actions = store.getActions();

    expect(actions).toEqual([setGenre('Drama')]);
  });

  it('have active class if isActive is true', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Comedy',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogGenreListElement genre="Comedy" isActive />
        </Provider>
      </MemoryRouter>
    );

    const genreItem = screen.getByText('Comedy').closest('li');

    expect(genreItem).toHaveClass('catalog__genres-item--active');
  });
});
