import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { capitalize, getPluralEnding, getRatingWidth } from '../../utils/utils';
import ButtonBookmark from '../../components/button-bookmark/button-bookmark';
import { OfferType, PreviewOfferType } from '../../types/types';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getNearPlaces } from '../../store/offer-data/selectors';
import cn from 'classnames';
import { MAX_PICS_AMOUNT } from '../../const';

type OfferContentProps = {
  offer: OfferType;
}

function OfferContent({offer}: OfferContentProps): JSX.Element {
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const nearPlaces = useAppSelector(getNearPlaces);

  const minimizeCurrentOffer = (currentOffer: OfferType): PreviewOfferType => ({
    id: currentOffer.id,
    title: currentOffer.title,
    type: currentOffer.type,
    price: currentOffer.price,
    city: {
      name: currentOffer.city.name,
      location: {
        latitude: currentOffer.city.location.latitude,
        longitude: currentOffer.city.location.longitude,
        zoom: currentOffer.city.location.zoom
      },
    },
    location: {
      latitude: currentOffer.location.latitude,
      longitude: currentOffer.location.longitude,
      zoom: currentOffer.location.zoom
    },
    isFavorite: currentOffer.isFavorite,
    isPremium: currentOffer.isPremium,
    rating: currentOffer.rating,
    previewImage: currentOffer.images[0]
  });

  const pointsForMap = [...nearPlaces, minimizeCurrentOffer(offer)];

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.slice(0, MAX_PICS_AMOUNT).map((src): JSX.Element => (
              <div key={src} className="offer__image-wrapper">
                <a href="#">
                  <img className="offer__image" src={src} alt="Photo studio" />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <ButtonBookmark offerId={offer.id} isFavorite={offer.isFavorite} islarge />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${getRatingWidth(offer.rating)}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalize(offer.type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedroom{getPluralEnding(offer.bedrooms)}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adult{getPluralEnding(offer.maxAdults)}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((item) => (
                  <li key={item} className="offer__inside-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div
                  className={cn('offer__avatar-wrapper user__avatar-wrapper', {
                    'offer__avatar-wrapper--pro': offer.host.isPro,
                  })}
                >
                  <img className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt={offer.host.name}
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <ReviewsList>
              {isAuth && <ReviewForm offerId={offer.id}/>}
            </ReviewsList>
          </div>
        </div>
        <Map points={pointsForMap} selectedPoint={offer.id} city={offer.city} className={'offer__map'} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <OfferList offerData={nearPlaces} className='near-places__card' />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferContent;
