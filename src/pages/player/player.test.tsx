import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {createAxios} from '../../services/api';
import {State} from '../../types/state';
import {Player} from './player';
import {ReducerName} from '../../types/reducer-name';
import {filmsMock} from '../../mocks/films-mock.ts';
import {RoutesData} from '../../routes/routes-data.ts';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = filmsMock[0];

describe('Player Component', () => {
  it('renders video player with controls', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Player.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Player} element={<Player/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const videoPlayer = screen.getByTestId('video');
      expect(videoPlayer).toBeInTheDocument();

      const exitButton = screen.getByText('Exit');
      expect(exitButton).toBeInTheDocument();

      const playButton = screen.getByText('Pause');
      expect(playButton).toBeInTheDocument();
    });
  });

  it('toggles play/pause when play button is clicked', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesData.Player.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesData.Player} element={<Player/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByText('Pause');
    const videoPlayer: HTMLVideoElement = screen.getByTestId('video');

    expect(videoPlayer.paused).toBe(true);

    fireEvent.click(playButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, 1000);
    });
  });
});
