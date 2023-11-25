import { SortOption } from '../const';
import { store } from '../store';

type Location = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
}

type UserType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type PreviewOfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type OfferType = PreviewOfferType & {
  bedrooms: number;
  description: string;
  host: UserType;
  images: string[];
  maxAdults: number;
  goods: string[];
}

export type ReviewType = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
}

export type PostReviewType = {
  id: string;
  rating: number;
  comment: string;
};

export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type FavoriteData = {
  id: string;
  status: number;
}

export type TypeState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;

export type SortingType = keyof typeof SortOption;
