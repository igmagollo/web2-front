import React from 'react';
import {InputText} from 'primereact/inputtext';
import PropTypes from "prop-types";
import {Instance as Http} from '../../core/axios-instance';
import {withRouter} from 'react-router-dom';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {LoadingBar} from '../../components/loading-bar/loading-bar';
import {ErrorMessage} from '../../components/error-message/error-message';
import {SideMenuService} from '../../components/side-menu/side-menu-service';
import {CookieService} from '../../core/cookie-service';
import User from '../../core/user-service';


class Login extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };
    
    constructor(props) {
		super(props);
		this.state = {
            username: '',
            username_error: false,
            password: '',
            password_error: false,
            hasError: false,
            isLoading: false
        };
    }

    required(field, value) {
        const obj = {};

        obj[`${field}_error`] = !value;
        this.setState(obj);
    }

    setSubmiting() {
        this.setState({hasError: false});
        this.setState({isLoading: true});
    }

    setError() {
        this.setState({hasError: true});
        this.setState({isLoading: false});
    }
    
    submit() {
        if (this.state.username_error || this.state.password_error) return;
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        if (!data.username || !data.password) return;
        this.setSubmiting();
        Http.post('/auth', data).subscribe(
            (response) => {
                CookieService.setCookie('auth', response.data.token);
                User.getInstance().isLoggedIn = true;
                User.getInstance().data = response.data;
                SideMenuService.sendUpdate();
                this.props.history.push('/');
            },
            (err) => {
                this.setError();
            }
        );
    }

    render() {
        return (
            <div className="container">
                <div className="p-grid p-justify-center">
                    <Card title="Login" className="p-col" style={{ maxWidth: 400 }}>
                        <div className="p-col">
                            <InputText 
                                placeholder="Nome de Usuário"
                                value={this.state.username}
                                onChange={(e) => this.setState({username: e.target.value})}
                                onBlur={(e) => this.required('username', e.target.value)}
                                style={{ width: "100%" }}
                                className={
                                    this.state.username_error ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.username_error}
                                text="Este campo é obrigatório."
                            />
                        </div>
                        <div className="p-col">
                            <InputText
                                placeholder="Senha"
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                onBlur={(e) => this.required('password', e.target.value)}
                                style={{ width: "100%" }}
                                className={
                                    this.state.password_error ? 'p-error' : ''
                                }
                            />
                            <ErrorMessage 
                                visible={this.state.password_error}
                                text="Este campo é obrigatório."
                            />
                        </div>
                        <div className="p-col">
                            <ErrorMessage 
                                visible={this.state.hasError}
                                text="Nome de usuário ou senha incorretos."
                            />
                            <LoadingBar visible={this.state.isLoading} />
                            
                        </div>
                        <div className="p-col">
                            <Button
                                label="Entrar"
                                onClick={() => this.submit()} style={{width: "100%"}}
                                disabled={
                                    this.state.isLoading ||
                                    this.state.username_error ||
                                    this.state.password_error ||
                                    !this.state.username ||
                                    !this.state.password
                                }
                            />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
