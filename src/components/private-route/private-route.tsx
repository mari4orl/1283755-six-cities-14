import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthStatus } from '../../store/user-process/selectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  isLogin: boolean;
  children: ReactNode;
}

function PrivateRoute({ children, isLogin }: PrivateRouteProps) {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return null;
  }
  if (isLogin) {
    return authStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children;
  }
  return authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
