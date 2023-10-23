import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main';
import Offer from '../../pages/offer';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import NotFound from '../../pages/not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import {OfferType} from '../../types/types';

type AppProps = {
  offerData: OfferType[];
}

function App({offerData}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main offerData={offerData} />}
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Main}
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Login}
              >
                <Favorites offerData={offerData} />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
