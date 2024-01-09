import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Footer} from './footer.tsx';

describe('Footer', () => {
  test('renders footer with logo and copyright', () => {
    render(
      <MemoryRouter>
        <Footer/>
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();

    const copyrightText = screen.getByText('© 2023 What to watch Ltd.');
    expect(copyrightText).toBeInTheDocument();
  });

  test('navigates to Main page when logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/initial']} initialIndex={0}>
        <Routes>
          <Route path="/initial" element={<Footer/>}/>
        </Routes>
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link');
    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe('/');
  });
});
