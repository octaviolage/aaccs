import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CadastroFamilia } from './pages/cadastros/Familia';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}  exact />
      <Route path="/cadastro/familia" component={CadastroFamilia}  exact />
      <Route component={Home} exact />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
