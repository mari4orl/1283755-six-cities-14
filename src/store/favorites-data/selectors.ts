import {TypeState, PreviewOfferType} from '../../types/types';
import {NameSpace, Status} from '../../const';

export const getFavoritesOffers = (state: TypeState): PreviewOfferType[] => state[NameSpace.Favorites].favorites;

export const getFetchingStatus = (state: TypeState): Status => state[NameSpace.Favorites].fetchingStatus;
