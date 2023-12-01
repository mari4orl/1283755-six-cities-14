import cn from 'classnames';
import { memo, useState, MouseEvent } from 'react';
import { PreviewOfferType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';
import { postFavoriteStatusAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

type ButtonBookmarkProp = {
  offerId: PreviewOfferType['id'];
  islarge?: boolean;
  isFavorite: boolean;
}

const ButtonBookmark = memo(({isFavorite, offerId, islarge}: ButtonBookmarkProp): JSX.Element => {
  const [isFavorites, setFavorites] = useState(isFavorite);

  const isAuthorized = useAppSelector(getAuthCheckedStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const btnClassName = cn('button', {
    'place-card__bookmark-button': !islarge,
    'place-card__bookmark-button--active': isFavorites && !islarge,
    'offer__bookmark-button': islarge,
    'offer__bookmark-button--active': isFavorites && islarge,
  });

  const svgClassName = cn({
    'place-card__bookmark-icon': !islarge,
    'offer__bookmark-icon': islarge,
  });

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isAuthorized) {
      setFavorites((prevState) => !prevState);

      dispatch(postFavoriteStatusAction({
        id: offerId,
        status: isFavorites ? 0 : 1
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className={btnClassName} type="button"
      onClick={handleBtnClick}
    >
      <svg
        className={svgClassName}
        width={islarge ? '31' : '18'}
        height={islarge ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
});

ButtonBookmark.displayName = 'ButtonBookmark';

export default ButtonBookmark;
