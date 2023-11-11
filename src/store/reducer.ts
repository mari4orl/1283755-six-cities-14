import { offerData } from '../mocks/offers';
import { OfferType } from '../types/types';
import { changeCity, fetchOffers } from './action';
import {createReducer} from '@reduxjs/toolkit';

type reducerTypes = {
  activeCity: string;
  offers: OfferType[];
}

const initialState: reducerTypes = {
  activeCity: 'Paris',
  offers: offerData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offerData;
    });
});

export { reducer };
