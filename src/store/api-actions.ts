import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData, OfferType, TypeAppDispatch, TypeState, UserData } from '../types/types';
import { loadOffers, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

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
  dispatch(loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (error) {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('user/login', async ({login: email, password}, { dispatch, extra: api }) => {
  const { data: {token} } = await api.post<UserData>(APIRoute.Login, {email, password});
  saveToken(token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

export const logoutAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete<UserData>(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
