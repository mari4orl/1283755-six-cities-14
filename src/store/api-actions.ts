import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, NameSpace } from '../const';
import {
  AuthData,
  PreviewOfferType,
  PostReviewType,
  ReviewType,
  TypeAppDispatch,
  TypeState,
  UserData,
  OfferType,
  FavoriteData,
} from '../types/types';
import {
  redirectToRoute,
} from './action';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

type ExtraType = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<PreviewOfferType[], undefined, ExtraType>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PreviewOfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<
  OfferType,
  OfferType['id'],
  ExtraType
>(`${NameSpace.Offer}/fetchOffer`, async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<ReviewType[], OfferType['id'], ExtraType>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<ReviewType, PostReviewType, ExtraType>(
  `${NameSpace.Reviews}/postReview`,
  async ({id, rating, comment}, {extra: api}) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<
  PreviewOfferType[],
  PreviewOfferType['id'],
  ExtraType
>(`${NameSpace.Offer}/fetchNearPlaces`, async (offerId, { extra: api }) => {
  const { data } = await api.get<PreviewOfferType[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
  );
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<PreviewOfferType[], undefined, ExtraType>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PreviewOfferType[]>(APIRoute.Favorite);
    return data;
  },
);


export const postFavoriteStatusAction = createAsyncThunk<OfferType, FavoriteData, ExtraType>(
  `${NameSpace.Favorites}/postFavorite`,
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<OfferType>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ExtraType>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: TypeAppDispatch;
    state: TypeState;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchFavoritesAction());
    dispatch(fetchOffersAction());
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TypeAppDispatch;
  state: TypeState;
  extra: AxiosInstance;
}
>(
  `${NameSpace.User}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(redirectToRoute(AppRoute.Main));
    await api.delete(APIRoute.Logout);

    dropToken();
  },
);
