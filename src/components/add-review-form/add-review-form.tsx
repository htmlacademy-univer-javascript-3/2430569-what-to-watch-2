import React, {ChangeEvent, Fragment, memo, useCallback, useState} from 'react';
import {addReview, fetchReviews} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../store/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {MAX_RATING} from '../const.ts';

const AddReviewFormComponent = ({filmId}: {filmId: string}) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });
  const [isSending, setIsSending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormDataChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setIsSending(true);
      dispatch(
        addReview({ filmId: filmId, rating: +formData.rating, comment: formData.comment })
      ).then(() => {
        fetchReviews(filmId);
      }).then(() => {
        navigate(`/films/${filmId}`);
      });
    },
    [dispatch, filmId, navigate, formData]
  );

  const enum CommentLength {
    Min = 50,
    Max = 400,
  }

  const isValidFormData =
    !isSending &&
    formData.rating !== 0 &&
    formData.comment.length >= CommentLength.Min &&
    formData.comment.length <= CommentLength.Max;

  return (
    <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from({length: MAX_RATING}).map((_, index) => {
              const value = MAX_RATING - index;
              return (
                <Fragment key={value}>
                  <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={`${value}`} onChange={handleFormDataChange}/>
                  <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
                </Fragment>
              );
            })
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="comment"
          placeholder="Review text"
          onChange={handleFormDataChange}
          value={formData.comment}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValidFormData}>Post</button>
        </div>
      </div>
    </form>);
};

export const AddReviewForm = memo(AddReviewFormComponent);
