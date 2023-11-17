// Importe os necessários
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogged } from '../../utils/auth';

const PublicRoute = ({ children, ...props }) => {
  return isLogged() ? <Navigate to="/" /> : <Route element={children} />;
};

export default PublicRoute;
