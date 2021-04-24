import React from 'react';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
// import Loading from '../components/Loading';

const Routes: React.FC = () => {
  const { signed } = useAuth();
  console.log(signed);

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;