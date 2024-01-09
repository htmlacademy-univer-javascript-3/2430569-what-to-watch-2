import {ChangeEvent, Fragment, useCallback, useState} from 'react';
import {addReview, fetchReviews} from '../store/api-actions.ts';
import {useAppDispatch} from '../store/hooks.ts';
import {useNavigate} from 'react-router-dom';

export const AddReviewForm = ({filmId}: {filmId: string}) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeFormData = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

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

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from({length: 10}).map((_, index) => {
              const value = 10 - index;
              return (
                <Fragment key={value}>
                  <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={`${value}`} onChange={handleChangeFormData}/>
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
          onChange={handleChangeFormData}
          value={formData.comment}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};
