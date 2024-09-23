import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // Auth state is where user info is stored
  const { userInfo } = useSelector((state) => state.auth)

  // If the user is logged in, render the outlet where the app screens are rendered
  // If the user isn't logged in, overwriter history and redirect to login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;