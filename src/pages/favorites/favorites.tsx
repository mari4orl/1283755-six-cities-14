import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getFavoritesOffers,
  getFavoritesStatus,
} from '../../store/offers-data/selectors';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import { Status } from '../../const';
import Loading from '../loading/loading';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesStatus = useAppSelector(getFavoritesStatus);
  const favorites = useAppSelector(getFavoritesOffers);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoritesAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div
      className={`page ${
        favorites.length === 0 ? 'page--favorites-empty' : ''
      }`}
    >
      {favoritesStatus === Status.Loading && <Loading />}
      {favoritesStatus === Status.Success && (
        <>
          <Helmet>
            <title>6 cities - Favorites</title>
          </Helmet>
          <Header />
          {favorites.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <FavoritesList />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Favorites;
