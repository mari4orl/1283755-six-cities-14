import { Fragment } from 'react';
import { ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Status } from '../../const';
import { getStatusPost } from '../../store/reviews-data/selectors';

const ratingReview = [
  {title: 'perfect', value: '5'},
  {title: 'good', value: '4'},
  {title: 'not bad', value: '3'},
  {title: 'badly', value: '2'},
  {title: 'terribly', value: '1'},
];

type RatingProp = {
  rating: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function Rating({rating, onChange}: RatingProp) {
  const statusPost = useAppSelector(getStatusPost);

  return (
    <div className="reviews__rating-form form__rating">
      {ratingReview.map(({title, value}) => (
        <Fragment key={`${title}-${value}`}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            onChange={onChange}
            checked={rating === value}
            disabled={statusPost === Status.Loading}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default Rating;
