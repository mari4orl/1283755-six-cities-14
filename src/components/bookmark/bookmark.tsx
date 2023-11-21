import cn from 'classnames';
import {useState} from 'react';
import {OfferType, PreviewOfferType} from '../../types/types';

type TButtonBookmarkProp = {
  offer: OfferType | PreviewOfferType;
  islarge?: boolean;
}

function ButtonBookmark({offer, islarge}: TButtonBookmarkProp): JSX.Element {
  const [isFavorites, setFavorites] = useState(offer.isFavorite);

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

  return (
    <button className={btnClassName} type="button"
      onClick= {() => {
        setFavorites(!isFavorites);
      }}
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
}

export default ButtonBookmark;
