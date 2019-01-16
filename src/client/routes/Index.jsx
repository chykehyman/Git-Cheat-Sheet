import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../components/App';
import SignUp from '../components/auth/SignUpPage';
import SignIn from '../components/auth/SignInPage';
import CheatPage from '../components/cheat/CheatPage';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/signin" />} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/cheats" component={CheatPage} />
    </Switch>
  </App>
);

export default Routes;
