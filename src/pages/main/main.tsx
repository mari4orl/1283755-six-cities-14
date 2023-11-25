import Header from '../../components/header/header';
import { PreviewOfferType } from '../../types/types';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/index';
import LocationList from '../../components/location-list/location-list';
import Sorting from '../../components/sorting/sorting';
import {sortByOption} from '../../utils/utils';
import { getActiveCity, getActiveSortedType } from '../../store/app-process/selectors';
import { getFilteredOffers, getOffersStatus } from '../../store/offers-data/selectors';
import Loading from '../loading/loading';
import { Status } from '../../const';

function Main(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<PreviewOfferType | undefined>();

  const offers: PreviewOfferType[] = useAppSelector(getFilteredOffers);
  const status = useAppSelector(getOffersStatus);
  const activeCity = useAppSelector(getActiveCity);

  const activeSortType = useAppSelector(getActiveSortedType);
  const currentOffers = useMemo(
    () => sortByOption(offers, activeSortType),
    [activeSortType, offers]
  );

  const handleListItemHover = (selectedCardId:PreviewOfferType['id'] | null) => {
    const currentPoint: PreviewOfferType | undefined = offers.find((offer) =>
      offer.id === selectedCardId,
    );
    setActiveOffer(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      {status === Status.Loading && (
        <Loading />
      )}
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationList />
        <div className="cities">
          {currentOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {currentOffers.length} places to stay in {activeCity}
                </b>
                <Sorting />
                <div className="cities__places-list places__list tabs__content">
                  <OfferList offerData={currentOffers} onListItemHover={handleListItemHover} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map points={currentOffers} city={currentOffers[0].city} selectedPoint={activeOffer?.id} className={'cities__map'} />
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
