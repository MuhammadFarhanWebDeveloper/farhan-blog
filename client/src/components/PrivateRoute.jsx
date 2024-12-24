// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
  const { currentUser } = useSelector((state) => state.user)
  

  return currentUser ? children : <Navigate to="/login" />;

};

export default PrivateRoute;
