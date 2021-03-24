import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route component={Home} exact />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
