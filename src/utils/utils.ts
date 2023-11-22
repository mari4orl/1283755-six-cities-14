import {AuthorizationStatus, SortOption} from '../const';
import {PreviewOfferType, ReviewType, TypeState} from '../types/types';

function sortByOption (offers: PreviewOfferType[], activeSortedType: string) {
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

function chechkAuthStatus (state: TypeState): boolean {
  const authorizationStatus = state.authorizationStatus;
  return authorizationStatus === AuthorizationStatus.Auth;
}

const getRatingWidth = function(rating:ReviewType['rating']):number {
  return Math.round(rating) * 20;
};

export {sortByOption, chechkAuthStatus, getRatingWidth};
