import { AuthorizationStatus, CityName, SortOption, Status } from '../const';

import { OfferType, PreviewOfferType, ReviewType, SortingType, UserData } from '../types/types';
import { changeCity, setSortedType, fetchFavorites, loadReviews, dropOffer } from './action';
import {createReducer} from '@reduxjs/toolkit';
import { checkAuthAction, fetchNearPlacesAction, fetchOfferAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction, postReviewAction } from './api-actions';

type reducerTypes = {
  activeCity: string;
  offers: PreviewOfferType[];
  activeSortedType: typeof SortOption[SortingType];
  favorites: PreviewOfferType[];
  authorizationStatus: AuthorizationStatus;
  reviews: ReviewType[];
  offer: OfferType | null;
  nearPlaces: PreviewOfferType[];
  statusOffer: Status;
  statusPost: Status;
  statusOffers: Status;
  statusLogin: Status;
  user: UserData | null;
}

const initialState: reducerTypes = {
  activeCity: CityName.Paris,
  offers: [],
  activeSortedType: SortOption.Popular,
  favorites: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  reviews: [],
  offer: null,
  nearPlaces: [],
  statusOffer: Status.Idle,
  statusPost: Status.Idle,
  statusOffers: Status.Idle,
  statusLogin: Status.Idle,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.activeCity;
    })
    // .addCase(loadOffers, (state, action) => {
    //   state.offers = action.payload;
    // })
    // .addCase(loadOffer, (state, action) => {
    //   state.offer = action.payload;
    // })
    .addCase(dropOffer, (state) => {
      state.offer = null;
    })
    .addCase(fetchFavorites, (state) => {
      state.favorites = state.offers.filter((offer) => offer.isFavorite); //TODO
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSortedType, (state, action) => {
      state.activeSortedType = action.payload.activeSortedType;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.statusOffers = Status.Success;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.statusOffers = Status.Loading;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.statusOffer = Status.Loading;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.statusOffer = Status.Success;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.statusOffer = Status.Error;
    })
    .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.statusPost = Status.Success;
    })
    .addCase(postReviewAction.pending, (state) => {
      state.statusPost = Status.Loading;
    })
    .addCase(postReviewAction.rejected, (state) => {
      state.statusPost = Status.Error;
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
      state.statusPost = Status.Success;
    })
    .addCase(loginAction.rejected, (state) => {
      state.statusLogin = Status.Error;
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.pending, (state) => {
      state.statusLogin = Status.Loading;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.statusLogin = Status.Success;
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(logoutAction.pending, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuthAction.pending, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.Unknown;
    });
  // .addCase(requireAuthorization, (state, action) => {
  //   state.authorizationStatus = action.payload;
  // });
});

export { reducer };
