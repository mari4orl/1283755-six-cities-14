import { AuthorizationStatus, SortOption } from '../const';

import { OfferType, SortingType } from '../types/types';
import { changeCity, loadOffers, setSortedType, setOffersDataLoadingStatus, fetchFavorites, requireAuthorization } from './action';
import {createReducer} from '@reduxjs/toolkit';

type reducerTypes = {
  activeCity: string;
  offers: OfferType[];
  activeSortedType: typeof SortOption[SortingType];
  isOffersDataLoading: boolean;
  favorites: OfferType[];
  authorizationStatus: AuthorizationStatus;
}

const initialState: reducerTypes = {
  activeCity: 'Paris',
  offers: [],
  activeSortedType: SortOption.Popular,
  isOffersDataLoading: false,
  favorites:[],
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchFavorites, (state, action) => {
      state.favorites = action.payload; //TODO
    })
    .addCase(setSortedType, (state, action) => {
      state.activeSortedType = action.payload.activeSortedType;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    }) ;
});

export { reducer };
