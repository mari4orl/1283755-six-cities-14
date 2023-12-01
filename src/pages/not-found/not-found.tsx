import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <div className={`${styles.page}`}>
      <img src="img\not-found.png" alt="Error 404" />
      <span className="visually-hidden">404</span>
      <p className={`${styles.places__found}`}>Not Found</p>
      <Link className="locations__item-link" to={ AppRoute.Main }>
        <span>Back To Main Page</span>
      </Link>
    </div>
  );
}
export default NotFound;
