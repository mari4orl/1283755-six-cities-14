import {SortingType, TypeState} from '../../types/types';
import {CityName, NameSpace, SortOption} from '../../const';

export const getActiveCity = (state: TypeState): CityName => state[NameSpace.App].activeCity;

export const getActiveSortedType = (state: TypeState): typeof SortOption[SortingType] => state[NameSpace.App].activeSortedType;
