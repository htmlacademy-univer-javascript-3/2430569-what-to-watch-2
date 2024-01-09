import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {MoviePageTabOverview} from './movie-page-tab-overview.tsx';
import {filmsMock} from '../../mocks/films-mock.ts';

describe('MoviePageTabOverview', () => {
  test('renders MoviePageTabOverview', () => {
    render(
      <MemoryRouter>
        <MoviePageTabOverview film={filmsMock[0]}/>
      </MemoryRouter>
    );

    const rating = screen.getByText('0.2');
    expect(rating).toBeInTheDocument();

    const ratingText = screen.getByText('Bad');
    expect(ratingText).toBeInTheDocument();

    const ratingCount = screen.getByText('716577 ratings');
    expect(ratingCount).toBeInTheDocument();

    const description = screen.getByText(filmsMock[0].description);
    expect(description).toBeInTheDocument();

    const director = screen.getByText('Director: Guy Ritchie');
    expect(director).toBeInTheDocument();

    const starring = screen.getByText('Starring: Jason Statham, Brad Pitt, Benicio Del Toro and other');
    expect(starring).toBeInTheDocument();
  });
});
