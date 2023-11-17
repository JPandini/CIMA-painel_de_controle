import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogged } from '../../utils/auth';

const PrivateRoute = ({ ...props }) => {
  return isLogged() ? <Route {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;