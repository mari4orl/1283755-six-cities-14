import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import LoggedInNav from './logged-in-nav';
import { AuthorizationStatus } from '../../const';
import LoggedOutNav from './logged-out-nav';

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const getCurrentHeaderItem = useMemo(
    () => (isAuth) ? LoggedInNav : LoggedOutNav,
    [isAuth]
  );

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {getCurrentHeaderItem()}
      </ul>
    </nav>
  );
}

export default Nav;
