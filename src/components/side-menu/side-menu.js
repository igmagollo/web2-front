import React from 'react';
import PropTypes from "prop-types";
import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu';
import {SideMenuService} from './side-menu-service.js';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'primereact/button';

class SideMenu extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			menuitems: [
				{
					label: 'Navegação',
					items: [
						{ label: 'Sites de Reservas', command: () => this.navigate('/sites-reservas')},
						{ label: 'Hotéis', },
						{ label: 'Promoções', },
					],
				},
				{ separator: true },
				{ label: 'Entrar', command: () => this.navigate('/login')}
			],
			visible: false,
		};
	}

	navigate(url) {
		this.props.history.push(url);
	}

	componentDidMount() {
		this.subscription = SideMenuService.isVisible().subscribe(
			val => {
				this.setState({visible: val});
			}
		);
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
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
