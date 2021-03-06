import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CadastroFamilia } from './pages/cadastros/Familia';
import { CadastroDoacao } from './pages/cadastros/Doacao';
import { ListagemFamilias } from './pages/listagem/familias';
import { ListagemDoadores } from './pages/listagem/doadores';
import { Configuracao } from './pages/configuracao';
import { MelhorOferta } from './pages/melhorOferta';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    {
      !window.location.origin.includes('https') && !window.location.origin.includes('localhost') ? 
      window.location.href = "https://aaccs.herokuapp.com/" : null
    }
    <Auth0Provider
      domain="aaccs-portal.us.auth0.com"
      clientId="yniD7kn38fjlg6oqiZVXPtZs466aAWuc"
      redirectUri={window.location.origin}
      audience="https://aaccs-portal.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <Switch>
        <Route path="/cadastro/familia" component={CadastroFamilia} exact />
        <Route path="/cadastro/doacao" component={CadastroDoacao} exact />
        <Route path="/edicao" component={Configuracao} exact />
        <Route path="/doacoes" component={ListagemDoadores} exact />
        <Route path="/familias" component={ListagemFamilias} exact />
        <Route path="/ofertas" component={MelhorOferta} exact />
        <Route component={Home} exact />

      </Switch>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
