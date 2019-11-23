import React from 'react';
import {SitesReservaService} from '../../services/sites-reserva-service';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {ErrorMessage} from '../../components/error-message/error-message';
import {LoadingBar} from '../../components/loading-bar/loading-bar';
import {InputMask} from 'primereact/inputmask';
import {Button} from 'primereact/button';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom';

class SitesReservasCadastro extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            url: {
                value: '',
                hasError: false,
                untouched: true
            },
            password: {
                value: '',
                hasError: false,
                untouched: true
            },
            nome: {
                value: '',
                hasError: false,
                untouched: true
            },
            telefone: {
                value: '',
                hasError: false,
                untouched: true
            },
            falha_cadastro: false,
            falha_cadastro_texto: '',
            isLoading: false
        };
        this.service = new SitesReservaService();
    }

    getFormData() {
        return {
            url: this.state.url.value,
            password: this.state.password.value,
            nome: this.state.nome.value,
            telefone: this.state.telefone.value
        }
    }

    setTouched(field) {
        this.setState((prevState) => {
            const obj = {};
            obj[field] = prevState[field];
            obj[field].untouched = false;
            return obj;
        });
    }

    required(field, value) {
        this.setState((prevState) => {
            const obj = {};
            obj[field] = prevState[field];
            obj[field].hasError = !value;
            return obj;
        });
    }

    setValue(field, value) {
        this.setState((prevState) => {
            const obj = {};
            obj[field] = prevState[field];
            obj[field].value = value;
            return obj;
        });
    }
    
    blur(field, value) {
        this.setTouched(field);
        this.required(field, value);
    }

    cantSubmit() {
        return (
                this.state.url.hasError ||
                this.state.url.untouched ||
                this.state.password.hasError ||
                this.state.password.untouched ||
                this.state.nome.hasError ||
                this.state.nome.untouched ||
                this.state.telefone.hasError ||
                this.state.telefone.untouched
            );
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

    submit() {
        if (this.cantSubmit()) return;
        this.setSubmitting();
        this.service.create(this.getFormData()).subscribe(
            (data) => this.props.history.push('/'),
            (err) => this.setError("Ocorreu um erro durante o cadastro.")
        );
    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Site de Reservas" style={{width: "100%"}}>
                    <div className="p-grid">
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <InputText 
                                placeholder="Endereço/URL"
                                value={this.state.url.value}
                                onChange={(e) => this.setValue('url', e.target.value)}
                                onBlur={(e) => this.blur('url', e.target.value)}
                                style={{ width: "100%" }}
                                className={
                                    this.state.url.hasError ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.url.hasError}
                                text="Este campo é obrigatório."
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <InputText 
                                placeholder="Nome"
                                value={this.state.nome.value}
                                onChange={(e) => this.setValue('nome', e.target.value)}
                                onBlur={(e) => this.blur('nome', e.target.value)}
                                style={{ width: "100%" }}
                                className={
                                    this.state.nome.hasError ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.nome.hasError}
                                text="Este campo é obrigatório."
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <InputText 
                                placeholder="Senha"
                                value={this.state.password.value}
                                type="password"
                                onChange={(e) => this.setValue('password', e.target.value)}
                                onBlur={(e) => this.blur('password', e.target.value)}
                                style={{ width: "100%" }}
                                className={
                                    this.state.password.hasError ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.password.hasError}
                                text="Este campo é obrigatório."
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <InputMask
                                mask="(99) 9?9999-9999"  
                                placeholder="Telefone"
                                value={this.state.telefone.value}
                                onChange={(e) => {
                                    this.setValue('telefone', e.value);
                                    this.blur('telefone', e.value)
                                }}
                                
                                style={{ width: "100%" }}
                                className={
                                    this.state.telefone.hasError ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.telefone.hasError}
                                text="Este campo é obrigatório."
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
                </Card>
            </div>
        );
    }
}

export default withRouter(SitesReservasCadastro);
