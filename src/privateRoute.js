import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from './utils/auth';

const PrivateRoute = ({ auth, children }) => {
  return auth.isAuthenticated && isLogged() ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;

