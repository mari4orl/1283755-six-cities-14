import { OfferType } from '../../types/types';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offerData: OfferType[];
};

function OfferList({offerData}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offerData.map((item: OfferType) => (
        <OfferCard key={item.id} offer={item} />
      ))}
    </div>
  );
}

export default OfferList;
