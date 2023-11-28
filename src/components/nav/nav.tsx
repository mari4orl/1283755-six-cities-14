import { useAppSelector } from '../../hooks/useAppSelector';
import LoggedInNav from './logged-in-nav';
import LoggedOutNav from './logged-out-nav';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';

function Nav(): JSX.Element {
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const getCurrentHeaderItem = () => (isAuth) ? <LoggedInNav /> : <LoggedOutNav />;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {getCurrentHeaderItem()}
      </ul>
    </nav>
  );
}
export default Nav;
