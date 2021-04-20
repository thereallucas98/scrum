import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import AddJob from '../pages/AddJob';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-project" component={AddJob} />
      </Switch>
    </BrowserRouter>

  );
}

export default AppRoutes;