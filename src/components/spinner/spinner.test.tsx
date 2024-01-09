import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Spinner} from './spinner.tsx';

describe('Spinner', () => {
  test('renders spinnner', () => {
    render(
      <MemoryRouter>
        <Spinner/>
      </MemoryRouter>
    );

    const spinner = screen.getByText('SPINNER');
    expect(spinner).toBeInTheDocument();
  });
});
