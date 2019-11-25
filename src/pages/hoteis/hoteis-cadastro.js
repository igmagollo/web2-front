import React from 'react';
import User from '../../core/user-service';
import {FormControl} from '../../classes/form-control';
import {required} from '../../classes/validations';
import FormInputText from '../../components/form-input-text/form-input-text';
import FormInputMask from '../../components/form-input-mask/form-input-mask';
import {Card} from 'primereact/card';
import {ErrorMessage} from '../../components/error-message/error-message';
import {LoadingBar} from '../../components/loading-bar/loading-bar';
import {Button} from 'primereact/button';
import PropTypes from "prop-types";
import {withRouter, Redirect} from 'react-router-dom';
import {HoteisService} from '../../services/hoteis-service';
import {PopupMessagesService} from '../../components/popup-messages/popup-messages-service';

class HoteisCadastro extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            cnpj: new FormControl('', [ required ]),
            nome: new FormControl('', [ required ]),
            password: new FormControl('', [ required ]),
            cidade: new FormControl('', [ required ]),
            falha_cadastro: false,
            falha_cadastro_texto: '',
            isLoading: false
        };
        
        this.service = new HoteisService();
    }

    getFormData() {
        return {
            cnpj: this.state.cnpj.value,
            senha: this.state.password.value,
            nome: this.state.nome.value,
            cidade: this.state.cidade.value
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
            !this.state.cnpj.isValid() ||
            !this.state.password.isValid() ||
            !this.state.nome.isValid() ||
            !this.state.cidade.isValid()
        );
    }

    submit() {
        if (this.cantSubmit()) return;
        this.setSubmitting();
        this.service.create(this.getFormData()).subscribe(
            (data) => {
                PopupMessagesService.success("Cadastro Efetuado com Sucesso.");
                this.props.history.push('/');
            },
            (err) => this.setError("Ocorreu um erro durante o cadastro.")
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
                <Card title="Cadastro de Hotel" style={{width: "100%"}}>
                    <div className="p-grid">
                        <div className="p-col p-col-12 p-md-6 p-lg-3">
                            <FormInputMask
                                label="CNPJ" 
                                mask="99.999.999/9999-99"  
                                formControl={this.state.cnpj}
                                onChange={(e) => this.setValue('cnpj', e.target.value)}
                                onBlur={(e) => this.setValue('cnpj', e.target.value)}
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
                            <FormInputText 
                                label="Cidade" 
                                formControl={this.state.cidade}
                                onChange={(e) => this.setValue('cidade', e.target.value)}
                                onBlur={(e) => this.setValue('cidade', e.target.value)}
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

export default withRouter(HoteisCadastro);

