import {PreviewOfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchNearPlacesAction} from '../api-actions';

type NearPlaces = {
  nearPlaces: PreviewOfferType[];
};

const initialState: NearPlaces = {
  nearPlaces: [],
};

export const nearPlacesData = createSlice({
  name: NameSpace.NearPlaces,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
      });
  }
});
