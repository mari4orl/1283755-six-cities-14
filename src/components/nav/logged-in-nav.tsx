import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { PreviewOfferType, TypeState, UserData } from '../../types/types';

function LoggedInNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: TypeState): UserData|null => state.user);
  const favorites = useAppSelector((state: TypeState): PreviewOfferType[] => state.favorites);
  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            {user?.email}
          </span>
          <span className="header__favorite-count">{favorites.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={AppRoute.Login}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default LoggedInNav;
