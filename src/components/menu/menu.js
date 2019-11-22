import React from 'react';
import {Link} from "react-router-dom";

export class Menu extends React.Component {

	generate() {
		let links = [];
		for(let i = 0; i < this.props.items.length; i++)
		{
			links.push(<li><Link to={this.props.items[i].path}>{this.props.items[i].label}</Link></li>);
		}
		return links;
	}

	render() {
		return (
			<ul>
				{this.generate()}
			</ul>
		)
	}
}
