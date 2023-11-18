import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offerData } from './mocks/offers';
import { reviewData } from './mocks/reviews';
import { nearPlaces } from './mocks/near-places';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOfferAction } from './store/api-actions';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offerData = {offerData}
        reviewData = {reviewData}
        nearPlaces={nearPlaces}
      />
    </Provider>
  </React.StrictMode>
);
