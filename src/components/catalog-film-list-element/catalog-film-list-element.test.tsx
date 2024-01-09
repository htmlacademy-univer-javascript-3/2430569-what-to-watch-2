import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {filmsMock} from '../../mocks/films-mock.ts';
import {CatalogFilmListElement} from './catalog-film-list-element.tsx';
import {vi} from 'vitest';
import {RoutesData} from '../../routes/routes-data.ts';

describe('CatalogFilmListElement', () => {
  const onMouseEnter = vi.fn();
  const onMouseLeave = vi.fn();

  test('renders CatalogFilmListElement', () => {
    render(
      <MemoryRouter>
        <CatalogFilmListElement
          film={filmsMock[0]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    const linkElement = screen.getAllByRole('link');

    expect(img).toBeInTheDocument();
    expect(linkElement.length).toEqual(2);
  });

  test('triggers mouseEnter and mouseLeave events', () => {
    render(
      <MemoryRouter>
        <CatalogFilmListElement
          film={filmsMock[0]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </MemoryRouter>
    );

    const filmCard = screen.getByRole('article');

    fireEvent.mouseEnter(filmCard);
    expect(onMouseEnter).toHaveBeenCalledWith(filmsMock[0].id);

    fireEvent.mouseLeave(filmCard);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  test('navigates to correct film link', () => {
    render(
      <MemoryRouter>
        <CatalogFilmListElement
          film={filmsMock[0]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </MemoryRouter>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements[0]).toHaveAttribute('href', RoutesData.Film.replace(':id', filmsMock[0].id));
    expect(linkElements[1]).toHaveAttribute('href', RoutesData.Film.replace(':id', filmsMock[0].id));

    fireEvent.click(linkElements[0]);
    fireEvent.click(linkElements[1]);
  });
});
