import {PreviewOfferType, TypeState} from '../../types/types';
import {MAX_NEAR_PLACES, NameSpace} from '../../const';
import { createSelector } from '@reduxjs/toolkit';

export const getNearPlaces = (state: TypeState): PreviewOfferType[] => state[NameSpace.NearPlaces].nearPlaces;

export const getSlicedNearPlaces = createSelector(
  [getNearPlaces],
  (nearPlaces: PreviewOfferType[]): PreviewOfferType[] => (
    nearPlaces.slice(0, MAX_NEAR_PLACES)
  )
);
