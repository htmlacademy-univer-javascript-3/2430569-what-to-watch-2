import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {MoviePageTabReviews} from './movie-page-tab-reviews.tsx';
import reviews from '../../mocks/reviews-mock.ts';
import {getDateString} from '../../utils/date.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state.ts';
import {Provider} from 'react-redux';
import {createAxios} from '../../services/api.ts';
import thunk from 'redux-thunk';

const api = createAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('Reviews', () => {
  const mockReviews = reviews;
  const initialState = {
    [ReducerName.Film]: {
      reviews: mockReviews
    }
  };

  test('renders reviews with correct content', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviePageTabReviews/>
        </MemoryRouter>
      </Provider>
    );

    mockReviews.forEach((review) => {
      const reviewText = screen.getByText(review.comment);
      const reviewAuthor = screen.getByText(review.user);
      const reviewDate = screen.getByText(getDateString(new Date(review.date)));
      const reviewRating = screen.getByText(`${review.rating}`);

      expect(reviewText).toBeInTheDocument();
      expect(reviewAuthor).toBeInTheDocument();
      expect(reviewDate).toBeInTheDocument();
      expect(reviewRating).toBeInTheDocument();
    });
  });
});
