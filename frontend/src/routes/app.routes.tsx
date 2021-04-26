import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import AddProject from '../pages/AddProject';
import Home from '../pages/Home';
import Loading from '../components/Loading';
import Profile from '../pages/Profile';
import EditProject from '../pages/EditProject';

const AppRoutes: React.FC = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />
  } else {
    return (
      <Switch>
        <Route path="/dashboard" component={Home} />
        <Route path="/add-project" component={AddProject} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/project/:id" component={EditProject} />
      </Switch>
    );
  }
}

export default AppRoutes;