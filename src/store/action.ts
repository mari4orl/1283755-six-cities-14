import {createAction} from '@reduxjs/toolkit';
import { PreviewOfferType, ReviewType, SortingType } from '../types/types';
import { AppRoute, AuthorizationStatus, SortOption } from '../const';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

// export const loadOffers = createAction<PreviewOfferType[]>('offers/loadOffers');

// export const loadOffer = createAction<PreviewOfferType>('offer/loadOffer');

export const dropOffer = createAction('offer/dropOffer');

export const loadReviews = createAction<ReviewType[]>('reviews/loadReviews');

export const fetchFavorites = createAction<PreviewOfferType[]>('favorites/fetchFavorites');

export const setSortedType = createAction<{activeSortedType: typeof SortOption[SortingType]}>('offers/setSortedType');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
