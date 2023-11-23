import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';
import { reviewsData } from './reviews-data/reviews-data';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { nearPlacesData } from './near-places-data/near-places-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.NearPlaces]: nearPlacesData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
