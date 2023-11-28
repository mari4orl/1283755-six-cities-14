import {PreviewOfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, Status} from '../../const';
import {fetchFavoritesAction, fetchOffersAction, postFavoriteStatusAction} from '../api-actions';

type OffersData = {
  fetchingStatus: Status;
  offers: PreviewOfferType[];
  favorites: PreviewOfferType[];
  fetchingFavoritesStatus: Status;
};

const initialState: OffersData = {
  fetchingStatus: Status.Idle,
  offers: [],
  favorites: [],
  fetchingFavoritesStatus: Status.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    dropFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.fetchingStatus = Status.Success;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.fetchingStatus = Status.Loading;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.fetchingStatus = Status.Error;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchingFavoritesStatus = Status.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.fetchingFavoritesStatus = Status.Success;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        const {id, isFavorite} = action.payload;

        state.offers = state.offers.map((offer) => {
          if (offer.id === id) {
            return {
              ...offer,
              isFavorite
            };
          }

          return offer;
        });

        if (isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((item) => item.id !== id);
        }
      });
  }
});

export const {dropFavorites} = offersData.actions;
