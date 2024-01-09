import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter} from 'react-router-dom';
import {RoutesData} from '../../routes/routes-data.ts';
import {NotFoundPage} from './not-found-page.tsx'; // Adjust the path accordingly

describe('NotFoundPage', () => {
  test('renders 404 NOT FOUND heading', () => {
    render(<NotFoundPage/>, {wrapper: MemoryRouter});
    const headingElement = screen.getByRole('heading', {level: 1});
    expect(headingElement).toHaveTextContent('404 NOT FOUND');
  });

  test('renders a link to the main page', () => {
    render(<NotFoundPage/>, {wrapper: MemoryRouter});
    const linkElement = screen.getByRole('link', {name: /main/i});
    expect(linkElement).toHaveAttribute('href', RoutesData.Main);
  });
});
