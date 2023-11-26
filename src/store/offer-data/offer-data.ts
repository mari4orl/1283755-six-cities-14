import {OfferType, PreviewOfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {MAX_NEAR_PLACES, NameSpace, Status} from '../../const';
import {fetchNearPlacesAction, fetchOfferAction, postFavoriteStatusAction} from '../api-actions';

type offerData = {
  fetchingStatus: Status;
  offer: OfferType | null;
  nearPlaces: PreviewOfferType[];
  fetchingNearPlacesStatus: Status;
};

const initialState: offerData = {
  fetchingStatus: Status.Idle,
  offer: null,
  nearPlaces: [],
  fetchingNearPlacesStatus: Status.Idle
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.offer = null;
      state.nearPlaces = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.fetchingStatus = Status.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.fetchingStatus = Status.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.fetchingStatus = Status.Error;
      })
      .addCase(fetchNearPlacesAction.pending, (state) => {
        state.fetchingNearPlacesStatus = Status.Loading;
      })
      .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload.slice(0, MAX_NEAR_PLACES);
        state.fetchingNearPlacesStatus = Status.Success;
      })
      .addCase(fetchNearPlacesAction.rejected, (state) => {
        state.fetchingNearPlacesStatus = Status.Error;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        const {isFavorite} = action.payload;

        if (state.offer) {
          state.offer.isFavorite = isFavorite;
        }
      });
  }
});

export const {dropOffer} = offerData.actions;
