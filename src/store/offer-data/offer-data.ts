import {OfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, Status} from '../../const';
import {fetchOfferAction} from '../api-actions';

type offerData = {
  statusOffer: Status;
  offer: OfferType | null;
};

const initialState: offerData = {
  statusOffer: Status.Idle,
  offer: null,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.offer = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.statusOffer = Status.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.statusOffer = Status.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.statusOffer = Status.Error;
      });
  }
});

export const {dropOffer} = offerData.actions;
