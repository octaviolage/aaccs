import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}  exact />
      <Route component={Home} exact />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
