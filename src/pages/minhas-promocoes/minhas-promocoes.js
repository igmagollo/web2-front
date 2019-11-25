import React from 'react';
import PromocoesDataview from '../../components/promocoes-dataview/promocoes-dataview';
import {PromocoesService} from '../../services/promocoes-service';
import User from '../../core/user-service';
import {ProgressSpinner} from 'primereact/progressspinner';
import {withRouter, Redirect} from 'react-router-dom';
import PropTypes from "prop-types";

class MinhasPromocoes extends React.Component {
    static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            promocoes: [],
            searching: true
        }
        this.promo_service = new PromocoesService();
    }

    componentDidMount() {
        const user = User.getInstance().getUserData();
        const request = (user.tipo == 1 ? 
            this.promo_service.getBySite(user.id) : this.promo_service.getByHotel(user.id));
        request.subscribe(
            (response) => {
                this.setState({promocoes: response.data});
                this.setState({searching: false});
            },
            (err) => {
                this.setState({searching: false});
            }
        );
    }

    render() {
        return (
            <div className="container">
                {
                    (!User.getInstance().isLoggedIn || (User.getInstance().getUserData().tipo != 1 && User.getInstance().getUserData().tipo != 2)) &&
                    <Redirect to="/" />
                }
                {
					this.state.searching &&
					<div className="p-grid p-align-center p-justify-center"
						style={{marginTop: 16}}
					>
						<ProgressSpinner style={{margin: 'auto'}} />
					</div>
				}
				{
					!this.state.searching &&
					<PromocoesDataview title="Minhas promoções" promocoes={this.state.promocoes} />
				}
            </div>
        );
    }
}

export default withRouter(MinhasPromocoes);