import React from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Card} from 'primereact/card';


class PromocoesDataview extends React.Component {

	constructor() {
		super();
		this.state = {
            selected: {},
            layout: 'grid',
            visible: false
        };
        this.itemTemplate = this.itemTemplate.bind(this);
    }

	itemTemplate(promo, layout) {
        if (!promo) return null;
        const dateInicio = new Date(promo.data_inicio);
        const strInicio = 
            dateInicio.getDate() + '/' 
            + ((dateInicio.getMonth() + 1 < 10 ) ? '0' + dateInicio.getMonth() + 1 : dateInicio.getMonth() + 1 )
            + '/' + dateInicio.getFullYear();
        const dateFim = new Date(promo.data_fim);
        const strFim = 
            dateFim.getDate() + '/' 
            + ((dateFim.getMonth() + 1 < 10 ) ? '0' + dateFim.getMonth() + 1 : dateFim.getMonth() + 1 )
            + '/' + dateFim.getFullYear();

        return (
            <div className="p-grid p-col-12 p-md-3" style={{margin: 0}}>
                <Card title={promo.hotel.nome}
                    style={{ textAlign: 'center', border: 'solid 1px rgba(0,0,0,.3)', width: "100%" }}     
                >
                        <div><h3 style={{ color: 'green' }}>R$ {promo.preco},00</h3></div>
                        <div>{strInicio} - {strFim}</div>
                        <div>Disponível em: <a>{promo.site.url}</a></div>
                </Card>
            </div>
        );
    }

    renderHeader() {

        return (
            <h2 style={{textAlign: 'left', margin: 0 }}>{this.props.title}</h2>
        );
    }

	render() {
        const header = this.renderHeader();

		return (
            <div style={{marginTop: 16}}>
            <DataView
                value={this.props.promocoes}
                layout={this.state.layout}
                header={header}
                itemTemplate={this.itemTemplate}
                paginatorPosition={'both'} paginator={true} rows={12}
            >
            </DataView>
            </div>
		);
	}
}

export default PromocoesDataview;
