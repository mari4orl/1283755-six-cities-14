import { SortOption } from '../const';

import { OfferType, SortingType } from '../types/types';
import { changeCity, fetchOffers, setSortedType, setOffersDataLoadingStatus } from './action';
import {createReducer} from '@reduxjs/toolkit';

type reducerTypes = {
  activeCity: string;
  offers: OfferType[];
  activeSortedType: typeof SortOption[SortingType];
  isOffersDataLoading: boolean;
}

const initialState: reducerTypes = {
  activeCity: 'Paris',
  offers: [],
  activeSortedType: SortOption.Popular,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortedType, (state, action) => {
      state.activeSortedType = action.payload.activeSortedType;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
