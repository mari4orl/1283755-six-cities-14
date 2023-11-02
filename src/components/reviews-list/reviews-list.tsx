import Review from '../review/review';
import { ReviewType } from '../../types/types';

type ReviewsListProps = {
  reviewData: ReviewType[];
};

function ReviewsList({reviewData}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviewData.map((item: ReviewType) => (
        <Review key={`${item.id}-${item.user.id}`} review={item} />
      ))}
    </ul>
  );
}

export default ReviewsList;
