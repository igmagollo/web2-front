import React from 'react';
import {InputMask} from 'primereact/inputmask';
import {ErrorMessage} from '../../components/error-message/error-message';
import PropTypes from 'prop-types';

class FormInputMask extends React.Component {
    static propTypes = {
        formControl: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        mask: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <InputMask
                    placeholder={this.props.label}
                    type={this.props.type}
                    mask={this.props.mask}
                    value={this.props.formControl.value}
                    onChange={(e) => { if (this.props.onChange) this.props.onChange(e); }}
                    onBlur={(e) => { if (this.props.onBlur) this.props.onBlur(e); }}
                    style={{ width: "100%" }}
                    className={
                        this.props.formControl.showError() ? 'p-error' : ''
                    }
                />
                <ErrorMessage 
                    visible={this.props.formControl.showError()}
                    text={this.props.formControl.errorMessage}
                />
            </div>
        );
    }
}

export default FormInputMask;