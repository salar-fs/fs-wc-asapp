import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import Login from './Login/Login';
import Home from './Home/Home';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Profile from '../containers/Profile/Profile';

import NotFound from './NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
