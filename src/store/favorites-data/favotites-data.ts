
import {createSlice} from '@reduxjs/toolkit';
import {PreviewOfferType} from '../../types/types';
import {NameSpace, Status} from '../../const';
import {fetchFavoritesAction, postFavoriteStatusAction} from '../api-actions';

type TFavoritesData = {
  favorites: PreviewOfferType[];
  fetchingStatus: Status;
  statusChangeFavorite: Status;
};

const initialState: TFavoritesData = {
  favorites: [],
  fetchingStatus: Status.Idle,
  statusChangeFavorite: Status.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.fetchingStatus = Status.Success;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchingStatus = Status.Loading;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.fetchingStatus = Status.Error;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
        state.statusChangeFavorite = Status.Success;
      });
  }
});
