import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import Loading from '../components/Loading';

import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';

const AuthRoutes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/create-account" component={CreateAccount} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AuthRoutes;