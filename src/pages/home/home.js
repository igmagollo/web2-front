import React from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Card} from 'primereact/card';


class Home extends React.Component {

	constructor() {
		super();
		this.state = {
			promocoes: [],
		};
	}

	itemTemplate() {
		
	}

	render() {
		return (
			<div className="container">
				<Card title="Promoções">
				 </Card>
			</div>
		);
	}
}

export default Home;
