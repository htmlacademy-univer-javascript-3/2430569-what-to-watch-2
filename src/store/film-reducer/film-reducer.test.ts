import {filmReducer} from './film-reducer';
import {fetchFilm, fetchReviews, fetchSimilar, setFavorite} from '../api-actions';
import reviews from '../../mocks/reviews-mock.ts';
import {FilmState} from '../../types/film-state.ts';
import {filmsMock} from '../../mocks/films-mock.ts';

const mockFilm = filmsMock[0];
const mockFilms = filmsMock;
const mockReviews = reviews;

describe('film-reducer', () => {
  let state: FilmState;

  beforeEach(() => {
    state = {
      film: null,
      similar: [],
      isLoading: false,
      reviews: []
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        film: null,
        similar: [],
        isLoading: false,
        reviews: []
      });
  });

  describe('fetchFilm test', () => {
    it('should set isLoading on pending', () => {
      expect(filmReducer(state, {type: fetchFilm.pending.type, payload: mockFilm}).isLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      expect(filmReducer(state, {type: fetchFilm.fulfilled.type, payload: mockFilm}).film)
        .toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(filmReducer(state, {type: fetchFilm.fulfilled.type, payload: mockFilm}).isLoading)
        .toEqual(false);
    });
  });

  describe('fetchSimilar test', () => {
    it('should load similar films on fulfilled', () => {
      expect(filmReducer(state, {type: fetchSimilar.fulfilled.type, payload: mockFilms}).similar)
        .toEqual(mockFilms);
    });
  });

  describe('fetchReviews test', () => {
    it('should load reviews on fulfilled', () => {
      expect(filmReducer(state, {type: fetchReviews.fulfilled.type, payload: mockReviews}).reviews)
        .toMatchObject(mockReviews);
    });
  });

  describe('setFavorite fulfilled test', () => {
    it('should set film on .toEqual(mockFilms);', () => {
      expect(filmReducer(state, {type: setFavorite.fulfilled.type, payload: mockFilm}).film)
        .toEqual(mockFilm);
    });
  });
});
