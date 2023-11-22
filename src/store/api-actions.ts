import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../const';
import {
  AuthData,
  PreviewOfferType,
  PostReviewType,
  ReviewType,
  TypeAppDispatch,
  TypeState,
  UserData,
  OfferType,
} from '../types/types';
import {
  redirectToRoute,
  setOffersDataLoadingStatus,
} from './action';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

type ExtraType = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  PreviewOfferType[],
  undefined,
  ExtraType
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<PreviewOfferType[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  OfferType,
  OfferType['id'],
  ExtraType
>('offers/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  ReviewType[],
  OfferType['id'],
  ExtraType
>('reviews/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  return data;
});

export const postReviewAction = createAsyncThunk<ReviewType, PostReviewType, ExtraType>(
  'reviews/postComments',
  async ({id, rating, comment}, {extra: api}) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<
  PreviewOfferType[],
  PreviewOfferType['id'],
  ExtraType
>('nearPlaces/fetchNearplaces', async (offerId, { extra: api }) => {
  const { data } = await api.get<PreviewOfferType[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
  );
  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
