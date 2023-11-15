import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { OfferType, TypeAppDispatch, TypeState } from '../types/types';
import { fetchOffers, setOffersDataLoadingStatus } from './action';
import { AxiosInstance } from 'axios';

export const fetchOfferAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<OfferType[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(fetchOffers(data));
});
