import {PreviewOfferType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, Status} from '../../const';
import {fetchNearPlacesAction} from '../api-actions';

type NearPlaces = {
  nearPlacesStatus: Status;
  nearPlaces: PreviewOfferType[];
};

const initialState: NearPlaces = {
  nearPlacesStatus: Status.Idle,
  nearPlaces: [],
};

export const nearPlacesData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
        state.nearPlacesStatus = Status.Success;
      })
      .addCase(fetchNearPlacesAction.rejected, (state) => {
        state.nearPlacesStatus = Status.Error;
      });
  }
});
