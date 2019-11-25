import React from 'react';
import User from '../../core/user-service';
import {FormControl} from '../../classes/form-control';
import {required} from '../../classes/validations';
import FormInputText from '../../components/form-input-text/form-input-text';
import FormInputDate from '../../components/form-input-date/form-input-date';
import FormInputSelect from '../../components/form-input-select/form-input-selec';
import {Card} from 'primereact/card';
import {ErrorMessage} from '../../components/error-message/error-message';
import {LoadingBar} from '../../components/loading-bar/loading-bar';
import {Button} from 'primereact/button';
import PropTypes from "prop-types";
import {withRouter, Redirect} from 'react-router-dom';
import {PromocoesService} from '../../services/promocoes-service';
import {SitesReservaService} from '../../services/sites-reserva-service';
import {PopupMessagesService} from '../../components/popup-messages/popup-messages-service';
import { forkJoin } from 'rxjs';

class PromocoesCadastro extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            sites_reservas_options: [],
            site: new FormControl('', [ required ]),
            preco: new FormControl('', [ required ]),
            inicio: new FormControl('', [ required ]),
            fim: new FormControl('', [ required ]),
            falha_cadastro: false,
            falha_cadastro_texto: '',
            isLoading: false,
            hasOptions: false
        };
        
        this.service = new PromocoesService();
        this.sites_service = new SitesReservaService();
    }

    componentDidMount() {
        forkJoin(
            {
                sites: this.sites_service.list()
            }
        ).subscribe(
            (response) => {
                this.setState({sites_reservas_options: response.sites.data});
                this.setState({hasOptions: true});
            },
            (err) => {
                this.setState({sites_reservas_options: []});
            }
        );
    }

    getFormData() {
        return {
            site: this.state.site.value.id,
            preco: this.state.preco.value,
            hotel: User.getInstance().getUserData().id,
            data_inicio: this.state.inicio.value.toJSON(),
            data_fim: this.state.fim.value.toJSON()
        }
    }

    setValue(field, value) {
        this.state[field].update(value);
        this.setState({});
    }

    setSubmitting() {
        this.setState({isLoading: true});
        this.setState({falha_cadastro: false});
    }

    setError(message) {
        this.setState({falha_cadastro: true});
        this.setState({isLoading: false});
        this.setState({falha_cadastro_texto: message});
    }

    cantSubmit() {
        return (
            !this.state.preco.isValid() ||
            !this.state.inicio.isValid() ||
            !this.state.fim.isValid() ||
            !this.state.site.isValid()
        );
    }

    submit(e) {
        if (e) e.preventDefault();
        if (this.cantSubmit()) return;
        console.log(this.getFormData());
        this.setSubmitting();
        this.service.create(this.getFormData()).subscribe(
            (data) => {
                PopupMessagesService.success("Cadastro efetuado com sucesso.");
                this.props.history.push('/');
            },
            (err) => {
                this.setError(err.response.data.msg);
            }
        );
    }

    render() {
        return (
            <div className="container">
                {
                    ( !User.getInstance().isLoggedIn ||
                      User.getInstance().getUserData().tipo != 2 ) &&
                      <Redirect to='/' />
                }
                <Card title="Cadastro de Promoções" style={{width: "100%"}}>
                    <form onSubmit={(e) => this.submit(e)}>
                    <div className="p-grid p-fluid">
                        <div className="p-col p-col-12 p-md-6">
                            <FormInputSelect
                                label="Endereço/URL do Site de Reservas" 
                                options={this.state.sites_reservas_options}
                                optionLabel="url"
                                formControl={this.state.site}
                                onChange={(e) => this.setValue('site', e.value)}
                                onBlur={(e) => this.setValue('site', e.value)}
                                disabled={!this.state.hasOptions}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6">
                            <FormInputText 
                                label="Preço"
                                addonBefore="R$"
                                addonAfter=",00"
                                keyfilter="num"
                                formControl={this.state.preco}
                                onChange={(e) => this.setValue('preco', e.target.value)}
                                onBlur={(e) => this.setValue('preco', e.target.value)}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6">
                            <FormInputDate 
                                label="Data de Inicio" 
                                formControl={this.state.inicio}
                                onChange={(e) => this.setValue('inicio', e.value)}
                                onBlur={(e) => this.setValue('inicio', e.value)}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6">
                            <FormInputDate 
                                label="Data de Fim" 
                                formControl={this.state.fim}
                                onChange={(e) => this.setValue('fim', e.value)}
                                onBlur={(e) => this.setValue('fim', e.value)}
                            />
                        </div>
                        <div className="p-col p-col-12">
                            <ErrorMessage visible={this.state.falha_cadastro} text={this.state.falha_cadastro_texto} />
                            <LoadingBar visible={this.state.isLoading} />
                        </div>
                        <div className="p-col p-col-12">
                            <Button label="Cadastrar"
                                onClick={() => this.submit()}
                                style={{width: "100%"}}
                                disabled={this.cantSubmit()}
                            />
                        </div>
                    </div>
                    </form>
                </Card>
            </div>
        );
    }
}

export default withRouter(PromocoesCadastro);