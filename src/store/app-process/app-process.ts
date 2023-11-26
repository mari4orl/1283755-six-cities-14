import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityName, NameSpace, SortOption} from '../../const';
import { SortingType } from '../../types/types';

type AppProcess = {
  activeCity: CityName;
  activeSortedType: typeof SortOption[SortingType];
};

const initialState: AppProcess = {
  activeCity: CityName.Paris,
  activeSortedType: SortOption.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<CityName>) => {
      state.activeCity = action.payload;
    },
    setSortedType: (state, action: PayloadAction<typeof SortOption[SortingType]>) => {
      state.activeSortedType = action.payload;
    }
  },
});

export const {changeActiveCity, setSortedType} = appProcess.actions;
