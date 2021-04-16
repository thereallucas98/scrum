import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
    </BrowserRouter>

  );
}

export default AppRoutes;