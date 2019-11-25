import React from 'react';
import logo from './logo.svg';
import Home from './pages/home/home.js';
import SideMenu from './components/side-menu/side-menu.js';
import login from './pages/login/login';
import Bootstrap from './pages/bootstrap/bootstrap';
import {TopMenu} from './components/top-menu/top-menu.js';
import SitesReservasCadastro from './pages/sites-reservas/sites-reservas-cadastro';
import HoteisCadastro from './pages/hoteis/hoteis-cadastro';
import PromocoesCadastro from './pages/promocoes/promocoes-cadastro';
import {PopupMessages} from './components/popup-messages/popup-messages';
import {SideMenuService} from './components/side-menu/side-menu-service';
import {PopupMessagesService} from './components/popup-messages/popup-messages-service';
import MinhasPromocoes from './pages/minhas-promocoes/minhas-promocoes';


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
      (foi) => {
        this.setState({bootstraping: false});
        SideMenuService.sendUpdate();
        if (foi) {
          PopupMessagesService.success(`Bem vindo novamente, ${this.user.getUserData().nome}.`)
        }
      }
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
          <Route exact path="/sites-reservas/cadastro" component={SitesReservasCadastro}/>
          <Route exact path="/hoteis/cadastro" component={HoteisCadastro}/>
          <Route exact path="/promocoes/cadastro" component={PromocoesCadastro}/>
          <Route exact path="/minhas-promocoes" component={MinhasPromocoes}/>
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
