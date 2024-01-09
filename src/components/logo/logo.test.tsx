import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Logo} from './logo.tsx';
import {RoutesData} from '../../routes/routes-data.ts';

describe('Logo', () => {
  test('renders logo with link to main route', () => {
    render(
      <MemoryRouter>
        <Logo/>
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', {name: /W T W/i});
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', RoutesData.Main);
  });

  test('navigates to Main page when logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/initial']} initialIndex={0}>
        <Routes>
          <Route path="/initial" element={<Logo/>}/>
        </Routes>
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link');
    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe(RoutesData.Main); // Adjust the path accordingly
  });
});
