import React from 'react';
import logo from './logo.svg';
import Home from './pages/home/home.js';
import SideMenu from './components/side-menu/side-menu.js';
import {TopMenu} from './components/top-menu/top-menu.js';
import SitesReservas from './pages/sites-reservas/sites-reservas.js';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css';

function App() {
  return (
    <div className="App">
    	<TopMenu />
  		<SideMenu />
  		<Switch>
  			<Route exact path="/" component={Home}/> 
  			<Route exact path="/sites-reservas" component={SitesReservas}/>
    	</Switch>
    </div>
  );
}

export default App;
