import React from 'react';
import {InputText} from 'primereact/inputtext';
import {ErrorMessage} from '../../components/error-message/error-message';
import PropTypes from 'prop-types';

class FormInputText extends React.Component {
    static propTypes = {
        formControl: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="p-inputgroup">
                    {
                        this.props.addonBefore &&
                        <span className="p-inputgroup-addon">{this.props.addonBefore}</span>
                    }
                    <InputText
                        placeholder={this.props.label}
                        type={this.props.type}
                        keyfilter={this.props.keyfilter}
                        value={this.props.formControl.value}
                        onChange={(e) => { if (this.props.onChange) this.props.onChange(e); }}
                        onBlur={(e) => { if (this.props.onBlur) this.props.onBlur(e); }}
                        style={{ width: "100%" }}
                        className={
                            this.props.formControl.showError() ? 'p-error' : ''
                        }
                    />
                    {
                        this.props.addonAfter &&
                        <span className="p-inputgroup-addon">{this.props.addonAfter}</span>
                    }
                </div> 
                <ErrorMessage 
                    visible={this.props.formControl.showError()}
                    text={this.props.formControl.errorMessage}
                />
            </div>
        );
    }
}

export default FormInputText;