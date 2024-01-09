import {ReducerName} from '../../types/reducer-name.ts';
import {useAppSelector} from '../../store/hooks.ts';
import {memo} from 'react';

const getDateString = (postDate: Date) =>
  `${postDate.toLocaleString('eng', {
    month: 'long',
  })} ${postDate.getDate()}, ${postDate.getFullYear()}`;

const MoviePageTabReviewsElemComponent = ({text, author, date, rating}: {text: string; author: string; date: string; rating: number}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{text}</p>

      <footer className="review__details">
        <cite className="review__author">{author}</cite>
        <time className="review__date" dateTime={getDateString(new Date(date))}>{getDateString(new Date(date))}</time>
      </footer>
    </blockquote>
    <div className="review__rating">{rating}</div>
  </div>
);

const MoviePageTabReviewsElem = memo(MoviePageTabReviewsElemComponent);

const MoviePageTabReviewsComponent = () => {
  const stateReviews = useAppSelector((state) => state[ReducerName.Film].reviews);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {stateReviews.slice(stateReviews.length / 2, stateReviews.length).map((review) => (
          <MoviePageTabReviewsElem
            key={review.id}
            author={review.user}
            text={review.comment}
            date={review.date}
            rating={review.rating}
          />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {stateReviews.slice(0, stateReviews.length / 2).map((review) => (
          <MoviePageTabReviewsElem
            key={review.id}
            author={review.user}
            text={review.comment}
            date={review.date}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
};

export const MoviePageTabReviews = memo(MoviePageTabReviewsComponent);
