import {PreviewOfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, Status} from '../../const';
import {fetchOffersAction} from '../api-actions';

type OffersData = {
  statusOffers: Status;
  offers: PreviewOfferType[];
};

const initialState: OffersData = {
  statusOffers: Status.Idle,
  offers: [],
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.statusOffers = Status.Success;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.statusOffers = Status.Loading;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.statusOffers = Status.Error;
      });
  }
});
