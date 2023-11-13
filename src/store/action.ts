import {createAction} from '@reduxjs/toolkit';
import { OfferType } from '../types/types';

export const changeCity = createAction<{activeCity: string}>('offers/changeCity');

export const fetchOffers = createAction<{offers: OfferType[]}>('offers/fetchOffers');
