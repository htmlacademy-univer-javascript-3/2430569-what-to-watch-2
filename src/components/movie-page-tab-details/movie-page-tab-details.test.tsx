import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {MoviePageTabDetails} from './movie-page-tab-details.tsx';
import {filmsMock} from '../../mocks/films-mock.ts';

describe('MoviePageTabOverview', () => {
  test('renders MoviePageTabOverview', () => {
    render(
      <MemoryRouter>
        <MoviePageTabDetails film={filmsMock[0]}/>
      </MemoryRouter>
    );

    const director = screen.getByText('Guy Ritchie');
    expect(director).toBeInTheDocument();

    const starring = screen.getByText('Jason Statham, Brad Pitt, Benicio Del Toro');
    expect(starring).toBeInTheDocument();

    const runtime = screen.getByText('1h 44m');
    expect(runtime).toBeInTheDocument();

    const genre = screen.getByText('Comedy');
    expect(genre).toBeInTheDocument();

    const released = screen.getByText('2000');
    expect(released).toBeInTheDocument();
  });
});
