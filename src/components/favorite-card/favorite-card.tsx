import { Link } from 'react-router-dom';
import { PreviewOfferType } from '../../types/types';
import { AppRoute } from '../../const';
import ButtonBookmark from '../button-bookmark/button-bookmark';

type FavoriteCardProps = {
  offer: PreviewOfferType;
  city: string;
};

function FavoriteCard({ offer, city }: FavoriteCardProps): JSX.Element | null {
  if (offer.city.name !== city) {
    return null;
  }
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={ `${AppRoute.Offer}/${offer.id}` }>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonBookmark offerId={offer.id} isFavorite={offer.isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }}></span>
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

export default FavoriteCard;
