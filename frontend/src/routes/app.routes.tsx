import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import AddJob from '../pages/AddJob';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-project" component={AddJob} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>

  );
}

export default AppRoutes;