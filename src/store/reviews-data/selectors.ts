import {TypeState, ReviewType} from '../../types/types';
import {Status, NameSpace} from '../../const';

export const getReviews = (state: TypeState): ReviewType[] => (
  state[NameSpace.Reviews].reviews
);

export const getStatusPost = (state: TypeState): Status => (
  state[NameSpace.Reviews].statusPost
);
