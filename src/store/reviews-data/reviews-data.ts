import {createSlice} from '@reduxjs/toolkit';
import {ReviewType} from '../../types/types';
import {NameSpace, Status} from '../../const';
import {fetchReviewsAction, postReviewAction,} from '../api-actions';

type ReviewsData = {
  reviews: ReviewType[];
  statusPost: Status;
  reviewsStatus: Status;
};

const initialState: ReviewsData = {
  reviews: [],
  statusPost: Status.Idle,
  reviewsStatus: Status.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsStatus = Status.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = Status.Error;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.statusPost = Status.Loading;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.statusPost = Status.Error;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.statusPost = Status.Success;
      });
  }
});
