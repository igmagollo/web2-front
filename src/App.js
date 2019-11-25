import React from 'react';
import logo from './logo.svg';
import Home from './pages/home/home.js';
import SideMenu from './components/side-menu/side-menu.js';
import login from './pages/login/login';
import Bootstrap from './pages/bootstrap/bootstrap';
import {TopMenu} from './components/top-menu/top-menu.js';
import SitesReservas from './pages/sites-reservas/sites-reservas.js';
import SitesReservasCadastro from './pages/sites-reservas/sites-reservas-cadastro';
import HoteisCadastro from './pages/hoteis/hoteis-cadastro';
import PromocoesCadastro from './pages/promocoes/promocoes-cadastro';
import {PopupMessages} from './components/popup-messages/popup-messages';

import {
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import User from './core/user-service';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bootstraping: true
    }
    this.user = User.getInstance();
  }

  componentDidMount() {
		this.bootstrap();
	}

  bootstrap() {
    this.user.verifyLogin(
      () => this.setState({bootstraping: false})
    ); 
  }

  definePage() {
    return (
      <div>
        <TopMenu />
        <SideMenu />
        <PopupMessages />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/sites-reservas" component={SitesReservas}/>
          <Route exact path="/sites-reservas/cadastro" component={SitesReservasCadastro}/>
          <Route exact path="/hoteis/cadastro" component={HoteisCadastro}/>
          <Route exact path="/promocoes/cadastro" component={PromocoesCadastro}/>
        </Switch>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <CookiesProvider>
          { 
            this.state.bootstraping &&
            <Bootstrap />
          }
          {
            !this.state.bootstraping &&
            this.definePage()
          }
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
