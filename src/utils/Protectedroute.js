import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  // Verifique se o usuário está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Renderiza o Outlet, que renderiza os elementos filhos da rota
  return <Outlet />;
};

export default ProtectedRoute;
