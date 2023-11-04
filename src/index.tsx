import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offerData } from './mocks/offers';
import { reviewData } from './mocks/reviews';
import { nearPlaces } from './mocks/near-places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offerData = {offerData}
      reviewData = {reviewData}
      nearPlaces={nearPlaces}
    />
  </React.StrictMode>
);
