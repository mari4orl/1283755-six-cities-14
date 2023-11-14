import {SortOption} from '../const';
import {OfferType} from '../types/types';

function sortByOption (offers: OfferType[], activeSortedType: string) {
  switch (activeSortedType) {
    case SortOption.Popular:
      return offers;
    case SortOption.PriceLowToHigh:
      return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
    case SortOption.PriceHighToLow:
      return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
    case SortOption.TopRatedFirst:
      return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error(`Unknown activeSortType: ${activeSortedType}`);
  }
}

export {sortByOption};
