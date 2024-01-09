import {mainReducer} from './main-reducer';
import {Genre} from '../../types/genre';
import {fetchFavoriteFilms, fetchFilms, fetchPromo, logout, setFavorite} from '../api-actions';
import {setError, setGenre} from '../actions';
import {MainState} from '../../types/main-state.ts';
import {filmsMock} from '../../mocks/films-mock.ts';

const mockFilm = filmsMock[0];
const mockFilms = filmsMock;

describe('main-reducer', () => {
  let state: MainState;

  beforeEach(() => {
    state = {
      films: [],
      genreFilms: [],
      currentGenre: Genre.DefaultGenre,
      isFilmsLoading: false,
      error: null,
      promo: null,
      favoriteFilms: [],
      favoriteCount: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        films: [],
        genreFilms: [],
        currentGenre: Genre.DefaultGenre,
        isFilmsLoading: false,
        error: null,
        promo: null,
        favoriteFilms: [],
        favoriteCount: 0,
      });
  });

  describe('setGenre test', () => {
    it('should set genre', () => {
      expect(mainReducer(state, {type: setGenre.type, payload: mockFilm.genre}).currentGenre)
        .toEqual(mockFilm.genre);
    });
    it('setGenre should set genre films', () => {
      expect(mainReducer(state, {type: setGenre.type, payload: mockFilm.genre}).genreFilms)
        .toEqual([]);
    });
  });

  describe('setError test', () => {
    it('should set error', () => {
      expect(mainReducer(state, {type: setError.type, payload: '123'}).error)
        .toEqual('123');
    });
  });

  describe('fetchFilms test', () => {
    it('should set isLoading true on pending', () => {
      expect(mainReducer(state, {type: fetchFilms.pending.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(mainReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(false);
    });
    it('should set films on fulfilled', () => {
      expect(mainReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).films)
        .toEqual(mockFilms);
    });
    it('should set genre films equal films on fulfilled', () => {
      expect(mainReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).genreFilms)
        .toEqual(mockFilms);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('should set favorite films on fulfilled', () => {
      const newState = mainReducer(state, {type: fetchFavoriteFilms.fulfilled.type, payload: mockFilms});

      expect(newState.favoriteFilms).toEqual(mockFilms);
      expect(newState.favoriteCount).toEqual(mockFilms.length);
    });
    it('should set favorite films empty on rejected', () => {
      const newState = mainReducer(state, {type: fetchFavoriteFilms.rejected.type});

      expect(newState.favoriteFilms).toEqual([]);
      expect(newState.favoriteCount).toEqual(0);
    });
  });

  describe('fetchPromo test', () => {
    it('should set promo on fulfilled', () => {
      expect(mainReducer(state, {type: fetchPromo.fulfilled.type, payload: mockFilm}).promo)
        .toEqual(mockFilm);
    });
  });

  describe('toggleFavorite test', () => {
    const toggleFavoriteInitialState = {
      ...state,
      favoriteFilms: mockFilms.slice(0, 2),
      favoriteCount: 2,
    };

    it('should handle fulfilled  favoriteOn', () => {
      const newState = mainReducer(toggleFavoriteInitialState, {
        type: setFavorite.fulfilled.type,
        payload: {isFavorite: false},
      });

      expect(newState.favoriteCount).toEqual(toggleFavoriteInitialState.favoriteCount - 1);
    });

    it('should handle fulfilled with favoriteOff', () => {
      const newState = mainReducer(toggleFavoriteInitialState, {
        type: setFavorite.fulfilled.type,
        payload: {isFavorite: true},
      });
      expect(newState.favoriteCount).toEqual(toggleFavoriteInitialState.favoriteCount + 1);
    });
  });

  describe('logout test', () => {
    it('should set promo on fulfilled', () => {
      const newState = mainReducer(state, {type: logout.rejected.type});

      expect(newState.favoriteFilms).toEqual([]);
      expect(newState.favoriteCount).toEqual(0);
    });
  });
});
