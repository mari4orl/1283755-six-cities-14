import { OfferType } from '../../types/types';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offerData: OfferType[];
  onListItemHover?: (offerId:OfferType['id'] | null) => void;
};

function OfferList({offerData, onListItemHover}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offerData.map((item: OfferType) => (
        <OfferCard key={item.id} offer={item} onListItemHover={onListItemHover} />
      ))}
    </div>
  );
}

export default OfferList;
