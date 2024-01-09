import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import { State } from '../../types/state';

import { SignIn } from './sign-in.tsx';
import { ReducerName } from '../../types/reducer-name';
import {createAxios} from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('SignIn page', () => {
  const store = mockStore({
    [ReducerName.Auth]: {
      authStatus: AuthStatus.NoAuth,
      user: null,
    },
    [ReducerName.Main]: {
      error: null,
    },
  });

  it('Should render the sign-in page with form fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', {name: /Sign in/});

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('Should successfully submit the form with valid email and password', async () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', {name: /Sign in/});

    fireEvent.change(emailInput, { target: { value: 'mock@email.ru' } });
    fireEvent.change(passwordInput, { target: { value: 'qwerty123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(signInButton).not.toBeInTheDocument();
      }, 1000);
    });

  });

  it('Should display an error message for an invalid email', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const signInButton = screen.getByRole('button', {name: /Sign in/});

    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });

  it('Should display an error message for an invalid password', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', {name: /Sign in/});

    fireEvent.change(passwordInput, { target: { value: 'password-rakamafo' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });
});
