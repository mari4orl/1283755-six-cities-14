import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import {OfferType, ReviewType, NearPlacesType} from '../../types/types';
import { useAppSelector } from '../../hooks';
import Loading from '../../pages/loading/loading';

type AppProps = {
  offerData: OfferType[];
  reviewData: ReviewType[];
  nearPlaces: NearPlacesType[];
}

function App({offerData, reviewData, nearPlaces}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Loading />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main />}
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer reviewData={reviewData} offerData={offerData} nearPlaces={nearPlaces} />}
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
