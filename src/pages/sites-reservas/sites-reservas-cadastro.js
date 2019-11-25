import React from 'react';
import User from '../../core/user-service';
import {SitesReservaService} from '../../services/sites-reserva-service';
import {Card} from 'primereact/card';
import {ErrorMessage} from '../../components/error-message/error-message';
import {LoadingBar} from '../../components/loading-bar/loading-bar';
import {InputMask} from 'primereact/inputmask';
import {Button} from 'primereact/button';
import PropTypes from "prop-types";
import {withRouter, Redirect} from 'react-router-dom';
import {FormControl} from '../../classes/form-control';
import {required} from '../../classes/validations';
import FormInputText from '../../components/form-input-text/form-input-text';
import FormInputMask from '../../components/form-input-mask/form-input-mask';
import {PopupMessagesService} from '../../components/popup-messages/popup-messages-service';

class SitesReservasCadastro extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            url: new FormControl('', [ required ]),
            password: new FormControl('', [ required ]),
            nome: new FormControl('', [ required ]),
            telefone: new FormControl('', [ required ]),
            falha_cadastro: false,
            falha_cadastro_texto: '',
            isLoading: false
        };
        this.service = new SitesReservaService();
    }

    getFormData() {
        return {
            url: this.state.url.value,
            senha: this.state.password.value,
            nome: this.state.nome.value,
            telefone: this.state.telefone.value
        }
    }

    setValue(field, value) {
        this.state[field].update(value);
        this.setState({});
    }

    cantSubmit() {
        return (
                !this.state.url.isValid() ||
                !this.state.password.isValid() ||
                !this.state.nome.isValid() ||
                !this.state.telefone.isValid()
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

    submit(e) {
        if (e) e.preventDefault();
        if (this.cantSubmit()) return;
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
                      User.getInstance().getUserData().tipo != 0 ) &&
                      <Redirect to='/' />
                }
                <Card title="Cadastro de Site de Reservas" style={{width: "100%"}}>
                    <form onSubmit={(e) => this.submit(e)}>
                    <div className="p-grid">
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <FormInputText 
                                label="Endereço/URL" 
                                formControl={this.state.url}
                                onChange={(e) => this.setValue('url', e.target.value)}
                                onBlur={(e) => this.setValue('url', e.target.value)}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <FormInputText 
                                label="Nome" 
                                formControl={this.state.nome}
                                onChange={(e) => this.setValue('nome', e.target.value)}
                                onBlur={(e) => this.setValue('nome', e.target.value)}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <FormInputText 
                                label="Senha" 
                                type="password"
                                formControl={this.state.password}
                                onChange={(e) => this.setValue('password', e.target.value)}
                                onBlur={(e) => this.setValue('password', e.target.value)}
                            />
                        </div>
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <FormInputMask
                                label="Telefone" 
                                mask="(99) 9?9999-9999"  
                                formControl={this.state.telefone}
                                onChange={(e) => this.setValue('telefone', e.target.value)}
                                onBlur={(e) => this.setValue('telefone', e.target.value)}
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

export default withRouter(SitesReservasCadastro);
