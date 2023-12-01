import Header from '../../components/header/header';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import LocationList from '../../components/location-list/location-list';
import Loading from '../loading/loading';
import { Status } from '../../const';
import { getOffersStatus } from '../../store/offers-data/selectors';
import Cities from '../../components/cities/cities';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { dropFavorites } from '../../store/offers-data/offers-data';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (authStatus) {
      dispatch(fetchFavoritesAction());
    }
    return () => {
      dispatch(dropFavorites());
    };
  }, [dispatch, authStatus]);

  const status = useAppSelector(getOffersStatus);

  const [isNoLength, setLengthOffers] = useState<boolean>(false);

  const handleLengthOffers = useCallback((isLength: boolean) => {
    setLengthOffers(isLength);
  }, []);

  return (
    <div className="page page--gray page--main">
      {status === Status.Loading && (
        <Loading />
      )}
      {status === Status.Success && (
        <>
          <Header />
          <main className={`page__main page__main--index ${isNoLength ? 'page__main--index-empty' : ''}`}>
            <h1 className="visually-hidden">Cities</h1>
            <LocationList />
            <Cities onCityChange={handleLengthOffers} />
          </main>
        </>
      )}
    </div>
  );
}

export default Main;
