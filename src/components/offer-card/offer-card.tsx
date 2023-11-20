import { PreviewOfferType } from '../../types/types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import ButtonBookmark from '../bookmark/bookmark';
import { getRatingWidth } from '../../utils/utils';

type OfferProps = {
  offer: PreviewOfferType;
  onListItemHover?: (offerId:PreviewOfferType['id'] | null) => void;
  className?: string;
};

function OfferCard({ offer, onListItemHover, className }: OfferProps): JSX.Element {
  const handleMouseEnter = () => {
    onListItemHover?.(offer.id);
  };

  const handleMouseLeave = () => {
    onListItemHover?.(null);
  };

  return (
    <article
      className={`${className ? className : 'cities__card'} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={ `${AppRoute.Offer}/${offer.id}` }>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonBookmark offer={offer} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={ `${AppRoute.Offer}/${offer.id}` }>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export default OfferCard;
