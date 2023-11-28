import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function LoggedOutNav(): JSX.Element {

  return (
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        to={AppRoute.Login}
      >
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}

export default LoggedOutNav;
