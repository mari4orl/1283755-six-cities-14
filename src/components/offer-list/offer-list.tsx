import { OfferType } from '../../types/types';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offerData: OfferType[];
  onListItemHover?: (offerId:OfferType['id'] | null) => void;
  className?: string;
};

function OfferList({offerData, onListItemHover, className}: OfferListProps): JSX.Element {
  return (
    <>
      {offerData.map((item: OfferType) => (
        <OfferCard key={item.id} offer={item} onListItemHover={onListItemHover} className={className} />
      ))}
    </>
  );
}

export default OfferList;
