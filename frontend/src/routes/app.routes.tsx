import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import AddJob from '../pages/AddJob';
import CreateAccount from '../pages/CreateAccount';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/dashboard" component={Home} />
        <Route path="/add-project" component={AddJob} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>

  );
}

export default AppRoutes;