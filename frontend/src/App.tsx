import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import history from './contexts/history';
import Routes from './routes/index';

import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router history={history}>
          <Routes />
        </Router>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;