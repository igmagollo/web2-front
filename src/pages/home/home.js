import React from 'react';
import PromocoesDataview from '../../components/promocoes-dataview/promocoes-dataview';
import FormInputText from '../../components/form-input-text/form-input-text';
import FormInputDate from '../../components/form-input-date/form-input-date';
import {Card} from 'primereact/card';
import {PromocoesService} from '../../services/promocoes-service';
import {FormControl} from '../../classes/form-control';
import {required} from '../../classes/validations';
import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';


class Home extends React.Component {

	constructor() {
		super();
		this.state = {
			cidade: new FormControl('', [required]),
			data_inicio: new FormControl('', [required]),
			data_fim: new FormControl('', [required]),
			promocoes: [],
			serched: false,
			searching: false,
		};
		this.promo_service = new PromocoesService();
	}

	componentDidMount() {
	}

	setValue(field, value) {
        this.state[field].update(value);
        this.setState({});
	}
	
	cantSubmit() {
        return (
            !this.state.cidade.isValid() ||
            !this.state.data_inicio.isValid() ||
            !this.state.data_fim.isValid()
        );
    }

	search(e) {
		if (e) e.preventDefault();
		if (this.cantSubmit()) return;
		this.setState({searching: true});
		this.promo_service.getFiltered(
			this.state.cidade.value,
			this.state.data_inicio.value.toJSON(),
			this.state.data_fim.value.toJSON()
		).subscribe(
			(response) => {
				this.setState({promocoes: response.data});
				this.setState({searching: false});
				this.setState({serched: true});
			},
			(err) => this.setState({searching: false})
		);
	}



	render() {
		return (
			<div className="container">
				<Card title="Promoções">
					<form onSubmit={(e) => this.search(e)}>
						<div className="p-grid p-fluid">
							<div className="p-col-12 p-md-6 p-lg-3">
								<FormInputText 
									label="Cidade"
									formControl={this.state.cidade}
									onChange={(e) => this.setValue('cidade', e.target.value)}
									onBlur={(e) => this.setValue('cidade', e.target.value)}
								/>
							</div>
							<div className="p-col-12 p-md-6 p-lg-3">
								<FormInputDate 
									label="Data de Inicio" 
									formControl={this.state.data_inicio}
									onChange={(e) => this.setValue('data_inicio', e.value)}
									onBlur={(e) => this.setValue('data_inicio', e.value)}
								/>
							</div>
							<div className="p-col-12 p-md-6 p-lg-3">
								<FormInputDate 
									label="Data de Fim" 
									formControl={this.state.data_fim}
									onChange={(e) => this.setValue('data_fim', e.value)}
									onBlur={(e) => this.setValue('data_fim', e.value)}
								/>
							</div>
							<div className="p-col-12 p-md-6 p-lg-3">
								<Button label="Buscar"
									onClick={() => this.search()}
									style={{width: "100%"}}
									disabled={this.cantSubmit()}
								/>
							</div>
						</div>
					</form>
				</Card>
				{
					this.state.searching &&
					<div className="p-grid p-align-center p-justify-center"
						style={{marginTop: 16}}
					>
						<ProgressSpinner style={{margin: 'auto'}} />
					</div>
				}
				{
					(this.state.serched && !this.state.searching) &&
					<PromocoesDataview title="Promoções encontradas" promocoes={this.state.promocoes} />
				}	
			</div>
		);
	}
}

export default Home;
