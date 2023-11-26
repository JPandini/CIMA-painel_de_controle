import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from './utils/auth';

const PrivateRoute = ({ auth, children }) => {
  return auth.isAuthenticated && isLogged() ? (
    children
  ) : (
    <Navigate to="/telainicio" replace={true} />
  );
};

export default PrivateRoute;

