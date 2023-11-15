import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLogged } from '../../utils/auth';

const PrivateRoute = () => {
  const auth = isLogged(); 

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
