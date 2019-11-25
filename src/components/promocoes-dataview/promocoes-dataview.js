import React from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Card} from 'primereact/card';


class PromocoesDataview extends React.Component {

	constructor() {
		super();
		this.state = {
            promocoes: [],
            selected: {},
            layout: 'grid',
            visible: false
		};
    }
    
    renderListItem(promo) {
        return (
            <div className="p-col-12">
                <div>
                    <div class="p-grid">
                        <div className="p-col-12">Hotel: <b>{promo.hotel.nome}</b></div>
                        <div className="p-col-12">Preço: <b>R$ {promo.preco},00</b></div>
                        <Button icon="pi pi-search" onClick={(e) => this.setState({ selected: promo, visible: true })}></Button>
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(promo) {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Card header={promo.hotel.nome} style={{ textAlign: 'center' }}>
                    <div><b>R$ {promo.preco}</b>,00</div>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selected: promo, visible: true })}></Button>
                </Card>
            </div>
        );
    }

	itemTemplate(promo, layout) {
        if (!promo) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(promo);
        else if (layout === 'grid')
            return this.renderGridItem(promo);
    }

    renderHeader() {

        return (
            <div className="p-grid">
                <div className="p-col-12" style={{textAlign: 'left'}}>
                    
                </div>
            </div>
        );
    }

	render() {
		return (
			<div className="container">
				<Card title="Promoções">
					<DataView
						value={this.state.promocoes}
						paginator={false}
					>
					</DataView>
				 </Card>
			</div>
		);
	}
}

export default PromocoesDataview;
