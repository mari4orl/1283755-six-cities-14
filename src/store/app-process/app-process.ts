import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityName, NameSpace, SortOption} from '../../const';

type AppProcess = {
  activeCity: CityName;
  activeSortedType: string;
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
    setSortedType: (state, action: PayloadAction<string>) => {
      state.activeSortedType = action.payload;
    }
  },
});

export const {changeActiveCity, setSortedType} = appProcess.actions;
