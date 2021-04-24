import React from 'react';
import { BrowserRouter, Router, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import history from './contexts/history';
import Routes from './routes/index';

import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Router history={history}>
            <Routes />
          </Router>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;