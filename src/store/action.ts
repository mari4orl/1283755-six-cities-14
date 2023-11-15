import {createAction} from '@reduxjs/toolkit';
import { OfferType, SortingType } from '../types/types';
import { SortOption } from '../const';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const fetchOffers = createAction<{offers: OfferType[]}>('offers/fetchOffers');

export const setSortedType = createAction<{activeSortedType: typeof SortOption[SortingType]}>('offers/setSortedType');
