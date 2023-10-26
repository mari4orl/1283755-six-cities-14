import { useState } from 'react';
import { OfferType } from '../../types/types';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offerData: OfferType[];
};

function OfferList({offerData}: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<OfferType['id'] | null>(null);

  const handleCardOffer = (offerId: OfferType['id'] | null) => {
    setActiveOfferId(offerId);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offerData.map((item: OfferType) => (
        <OfferCard key={item.id} offer={item} onCardHover={handleCardOffer} />
      ))}
      <span>id hovered card {activeOfferId}</span>
    </div>
  );
}

export default OfferList;
