import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewForm from './review-form';
import { PreviewOfferType } from '../../types/types';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchReviewsAction, fetchNearPlacesAction, fetchOfferAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { dropOffer } from '../../store/action';
import { chechkAuthStatus, getRatingWidth } from '../../utils/utils';
import { MAX_NEAR_PLACES, Status } from '../../const';
import Loading from '../loading/loading';
import ButtonBookmark from '../../components/bookmark/bookmark';

function Offer(): JSX.Element {
  const {offerId} = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearPlacesAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);

  const currentOffer = useAppSelector((state) => state.offer);
  const nearPlacesToRender = useAppSelector((state) => state.nearPlaces).slice(0, MAX_NEAR_PLACES);
  const status = useAppSelector((state) => state.statusOffer);
  const isAuth = useAppSelector(chechkAuthStatus);

  if (currentOffer === null || status === Status.Loading) {
    return (
      <div className="page">
        <Helmet>
          <title>6 cities - Offer</title>
        </Helmet>
        <Loading />
      </div>
    );
  }

  const slicedImages = currentOffer.images.slice(0, 6);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {slicedImages.map((src): JSX.Element => (
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
              {currentOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <ButtonBookmark offer={currentOffer} islarge />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${getRatingWidth(currentOffer.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt={currentOffer.host.name}
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  <span className="offer__user-status">{currentOffer.host.isPro}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              {/* <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviewData={reviews} />
                <ReviewForm />
              </section> TODO */}
            </div>
          </div>
          <Map points={[...nearPlacesToRender, currentOffer]} city={currentOffer.city} className={'offer__map'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OfferList offerData={nearPlacesToRender} className='near-places__card' />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
