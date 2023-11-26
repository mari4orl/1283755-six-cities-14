import Header from '../../components/header/header';
import { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/index';
import LocationList from '../../components/location-list/location-list';

import Loading from '../loading/loading';
import { Status } from '../../const';
import { getOffersStatus } from '../../store/offers-data/selectors';
import Cities from '../../components/cities/cities';

function Main(): JSX.Element {
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
