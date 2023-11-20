import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({restrictedFor, redirectTo, children}: PrivateRouteProps) {
  const authorizationStatus = AuthorizationStatus.Auth;

  return (
    restrictedFor === authorizationStatus
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
