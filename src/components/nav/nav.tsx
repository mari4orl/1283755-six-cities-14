import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import LoggedInNav from './logged-in-nav';
import LoggedOutNav from './logged-out-nav';
import { chechkAuthStatus } from '../../utils/utils';

function Nav(): JSX.Element {
  const isAuth = useAppSelector(chechkAuthStatus);
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
