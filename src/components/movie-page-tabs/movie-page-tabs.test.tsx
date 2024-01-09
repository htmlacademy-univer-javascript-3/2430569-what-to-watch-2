import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {MoviePageTabs} from './movie-page-tabs.tsx';
import {filmsMock} from '../../mocks/films-mock.ts';

const filmMock = filmsMock[0];

describe('Tabs', () => {
  it('render tabs correctly', () => {
    render(
      <MemoryRouter>
        <MoviePageTabs film={filmMock}/>
      </MemoryRouter>
    );

    const overview = screen.getByText('Overview');
    const details = screen.getByText('Details');
    const reviews = screen.getByText('Reviews');

    expect(overview).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();
  });
});
