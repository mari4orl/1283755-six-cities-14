import { SortOption } from '../const';
import { offerData } from '../mocks/offers';
import { OfferType, SortingType } from '../types/types';
import { changeCity, fetchOffers, setSortedType } from './action';
import {createReducer} from '@reduxjs/toolkit';

type reducerTypes = {
  activeCity: string;
  offers: OfferType[];
  activeSortedType: typeof SortOption[SortingType];
}

const initialState: reducerTypes = {
  activeCity: 'Paris',
  offers: offerData,
  activeSortedType: SortOption.Popular
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offerData;
    })
    .addCase(setSortedType, (state, action) => {
      state.activeSortedType = action.payload.activeSortedType;
    });
});

export { reducer };
