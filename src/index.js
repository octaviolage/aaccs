import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CadastroFamilia } from './pages/cadastros/Familia';
import { CadastroDoacao } from './pages/cadastros/Doacao';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain="aaccs-portal.us.auth0.com"
      clientId="yniD7kn38fjlg6oqiZVXPtZs466aAWuc"
      redirectUri={window.location.origin}
    >
      <Switch>
        <Route path="/cadastro/familia" component={CadastroFamilia} exact />
        <Route path="/cadastro/doacao" component={CadastroDoacao} exact />
        <Route component={Home} exact />

      </Switch>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
