import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useEffect } from 'react';
import { fetchReviewsAction, fetchNearPlacesAction, fetchOfferAction, fetchFavoritesAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { Status } from '../../const';
import Loading from '../loading/loading';
import { getOffer, getOfferStatus } from '../../store/offer-data/selectors';
import {dropOffer} from '../../store/offer-data/offer-data';
import OfferContent from '../../components/offer-content/offer-content';

function Offer(): JSX.Element {
  const {offerId} = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearPlacesAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchFavoritesAction());
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);

  const currentOffer = useAppSelector(getOffer);
  const loadingStatus = useAppSelector(getOfferStatus);

  return (
    <div className="page">
      {(loadingStatus === Status.Loading || currentOffer === null) && (
        <Loading />
      )}
      {(loadingStatus === Status.Success && currentOffer !== null) && (
        <>
          <Helmet>
            <title>6 cities - Offer</title>
          </Helmet>
          <Header />

          <OfferContent offer={currentOffer} />
        </>
      )}
    </div>
  );
}

export default Offer;
