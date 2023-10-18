import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

function NotFound(): JSX.Element {
  return (
    <div className="page" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* <h1 className="login__title" style={{ fontSize: 320 }}>404</h1> */}
      <img src="..\public\img\not-found.png" alt="Error 404" />
      <p className="places__found" style={{ marginTop: '-100px'}}>Not Found</p>
      <Link className="locations__item-link" to={ AppRoute.Main }>
        <span>Back To Main Page</span>
      </Link>
    </div>
  );
}
export default NotFound;
