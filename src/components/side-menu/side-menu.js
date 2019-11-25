import React from 'react';
import PropTypes from "prop-types";
import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu';
import {SideMenuService} from './side-menu-service.js';
import {withRouter} from 'react-router-dom';
import * as Items from './menu-items';
import User from '../../core/user-service';

class SideMenu extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			menuitems: [],
			visible: false,
		};
	}

	update_menu() {
		const items = [
			{
				label: 'Navegação',
				items: [],
			},
			{ separator: true },
		];
		const user = User.getInstance();
		let tipo;
		if (user.isLoggedIn)
			tipo = user.getUserData().tipo;
		if (user.isLoggedIn) items.push(Items.Sair(this.navigate.bind(this)));
		else items.push(Items.Entrar(this.navigate.bind(this)));
		items[0].items.push(Items.Promocoes(this.navigate.bind(this)));
		if (user.isLoggedIn && tipo == 0) items[0].items.push(Items.CadastroSiteReservas(this.navigate.bind(this)));
		if (user.isLoggedIn && tipo == 0) items[0].items.push(Items.CadastroHoteis(this.navigate.bind(this)));
		if (user.isLoggedIn && tipo == 2) items[0].items.push(Items.CadastroPromocoes(this.navigate.bind(this)));
		if (user.isLoggedIn && tipo == 1) items[0].items.push(Items.MinhasPromocoesSite(this.navigate.bind(this)));
		if (user.isLoggedIn && tipo == 2) items[0].items.push(Items.MinhasPromocoesHotel(this.navigate.bind(this)));
		this.setState({ menuitems: items });
	}

	navigate(url) {
		this.props.history.push(url);
		SideMenuService.hideMenu();
	}

	componentDidMount() {
		this.update_menu();
		this.subscription = SideMenuService.isVisible().subscribe(
			val => {
				this.setState({visible: val});
			}
		);
		this.needUpdate = SideMenuService.needUpdate().subscribe(
			val => this.update_menu()
		);
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
		this.needUpdate.unsubscribe();
	}

	render() {
		return (
			<div>
				<Sidebar visible={this.state.visible} onHide={SideMenuService.hideMenu}>
					<h1 style={{fontWeight:'normal'}}>Menu</h1>
					<Menu model={this.state.menuitems}/>
				</Sidebar>
			</div>
		);
	}
}

export default withRouter(SideMenu);
