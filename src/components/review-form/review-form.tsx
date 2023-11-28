import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ReviewLenght, Status } from '../../const';
import { postReviewAction } from '../../store/api-actions';
import styles from './review-form.module.css';
import { getStatusPost } from '../../store/reviews-data/selectors';

type RatingFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: RatingFormProps): JSX.Element {
  const statusPost = useAppSelector(getStatusPost);

  const dispatch = useAppDispatch();
  const [review, setReview] = useState({
    rating: '',
    review: '',
    isValid: false,
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postReviewAction({
        id: offerId,
        rating: Number(review.rating),
        comment: review.review,
      })
    );
  };

  useEffect(() => {
    if (statusPost === Status.Success) {
      setReview({
        rating: '',
        review: '',
        isValid: false,
      });
    }
  }, [statusPost]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    const isValid =
      value.length >= ReviewLenght.Min && value.length <= ReviewLenght.Max;

    setReview({
      ...review,
      [name]: value,
      isValid,
    });
  };

  return (
    <form
      className={`reviews__form form ${
        statusPost === Status.Error && styles.formShake
      } ${statusPost === Status.Loading && styles.formUnavailable}`}
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      {statusPost === Status.Error && (
        <div className="reviews__error">
          <p className={`${styles.reviewsErrorText}`}>
            Failed to post review. Please try again!
          </p>
        </div>
      )}
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating rating={review.rating} onChange={handleInputChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.review}
        onChange={handleTextAreaChange}
        disabled={statusPost === Status.Loading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!review.rating || !review.isValid || statusPost === Status.Loading}>{statusPost === Status.Loading ? 'loading' : 'Submit'}</button>
      </div>
    </form>
  );
}
export default ReviewForm;
