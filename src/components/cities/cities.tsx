import Sorting from '../sorting/sorting';
import { getPluralEnding, sortByOption } from '../../utils/utils';
import {
  getActiveCity,
  getActiveSortedType,
} from '../../store/app-process/selectors';
import { getFilteredOffers } from '../../store/offers-data/selectors';
import { useMemo, useState } from 'react';
import { PreviewOfferType } from '../../types/types';
import { useAppSelector } from '../../hooks/use-app-selector';
import OfferList from '../offer-list/offer-list';
import MainEmpty from '../main-empty/main-empty';
import Map from '../map/map';

type CitiesProps = {
  onCityChange: (isLength: boolean) => void;
};

function Cities({ onCityChange }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<
    PreviewOfferType | undefined
  >();

  const offers = useAppSelector(getFilteredOffers);
  const activeCity = useAppSelector(getActiveCity);

  const activeSortType = useAppSelector(getActiveSortedType);
  const currentOffers = useMemo(
    () => sortByOption(offers, activeSortType),
    [activeSortType, offers]
  );

  const handleListItemHover = (
    selectedCardId: PreviewOfferType['id'] | null
  ) => {
    const currentPoint: PreviewOfferType | undefined = offers.find(
      (offer) => offer.id === selectedCardId
    );
    setActiveOffer(currentPoint);
  };

  if (currentOffers.length === 0) {
    onCityChange(true);
    return <MainEmpty city={activeCity} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {currentOffers.length} place{getPluralEnding(currentOffers.length)} to stay in {activeCity}
          </b>
          <Sorting />
          <div className="cities__places-list places__list tabs__content">
            <OfferList
              offerData={currentOffers}
              onListItemHover={handleListItemHover}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            points={currentOffers}
            city={currentOffers[0].city}
            selectedPoint={activeOffer?.id}
            className={'cities__map'}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
