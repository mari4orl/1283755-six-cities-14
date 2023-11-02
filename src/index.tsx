import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offerData } from './mocks/offers';
import { reviewData } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offerData = {offerData}
      reviewData = {reviewData}
    />
  </React.StrictMode>
);
