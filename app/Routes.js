import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ImageCapture from './components/ImageCapture';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={ImageCapture} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
