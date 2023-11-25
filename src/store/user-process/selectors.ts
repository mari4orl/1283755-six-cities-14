import {AuthorizationStatus, Status, NameSpace} from '../../const';
import {TypeState, UserData} from '../../types/types';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthStatus = (state: TypeState): AuthorizationStatus => (
  state[NameSpace.User].authorizationStatus
);

export const getStatusLogin = (state: TypeState): Status => (
  state[NameSpace.User].statusLogin //TODO
);

export const getUser = (state: TypeState): UserData | null => (
  state[NameSpace.User].user
);

export const getAuthCheckedStatus = createSelector(
  [getAuthStatus],
  (authStatus: AuthorizationStatus): boolean => (
    authStatus === AuthorizationStatus.Auth
  )
);
