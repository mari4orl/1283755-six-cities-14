import Header from '../../components/header/header';
import { OfferType } from '../../types/types';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/index';
import LocationList from '../../components/location-list/location-list';
import { TypeState } from '../../types/types';

function Main(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<OfferType | undefined>();

  const offers: OfferType[] = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state: TypeState): string => state.activeCity);

  const sortedOffers = offers.filter((offer) => offer.city.name === activeCity);

  const handleListItemHover = (selectedCardId:OfferType['id'] | null) => {
    const currentPoint: OfferType | undefined = sortedOffers.find((offer) =>
      offer.id === selectedCardId,
    );
    setActiveOffer(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationList />
        <div className="cities">
          {sortedOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length} places to stay in {activeCity}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <OfferList offerData={sortedOffers} onListItemHover={handleListItemHover} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map points={sortedOffers} city={sortedOffers[0].city} selectedPoint={activeOffer} className={'cities__map'} />
              </div>
            </div>
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in
                    Dusseldorf
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
