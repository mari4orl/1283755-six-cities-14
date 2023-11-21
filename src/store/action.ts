import {createAction} from '@reduxjs/toolkit';
import { PreviewOfferType, SortingType } from '../types/types';
import { AppRoute, AuthorizationStatus, SortOption } from '../const';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const dropOffer = createAction('offer/dropOffer');

export const fetchFavorites = createAction<PreviewOfferType[]>('favorites/fetchFavorites');

export const setSortedType = createAction<{activeSortedType: typeof SortOption[SortingType]}>('offers/setSortedType');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
