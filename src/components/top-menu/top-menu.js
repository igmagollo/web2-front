import React from 'react';
import { SideMenuService } from  '../side-menu/side-menu-service.js';
import {Menubar} from 'primereact/menubar';

export class TopMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			model: [
				{
					icon: 'pi pi-bars',
					command: () => { SideMenuService.showMenu(); }
				},
				{
					label: '3 Vago'
				}
			],
		};
	}

	render() {
		return (
			<div className="top-menu">
				<Menubar model={this.state.model}>
				</Menubar>
			</div>
		);
	}
}
