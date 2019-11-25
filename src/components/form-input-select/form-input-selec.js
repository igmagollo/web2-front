import React from 'react';
import {Dropdown} from 'primereact/dropdown';
import {ErrorMessage} from '../../components/error-message/error-message';
import PropTypes from 'prop-types';

class FormInputText extends React.Component {
    static propTypes = {
        formControl: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        optionLabel: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Dropdown
                    placeholder={this.props.label}
                    value={this.props.formControl.value}
                    options={this.props.options}
                    optionLabel={this.props.optionLabel}
                    filterby={this.props.filterby}
                    onChange={(e) => { if (this.props.onChange) this.props.onChange(e); }}
                    onMouseDown={(e) => { if (this.props.onBlur) this.props.onBlur(e); console.log(e)}}
                    style={{ width: "100%" }}
                    className={
                        this.props.formControl.showError() ? 'p-error' : ''
                    }
                    disabled={this.props.disabled}
                />
                <ErrorMessage 
                    visible={this.props.formControl.showError()}
                    text={this.props.formControl.errorMessage}
                />
            </div>
        );
    }
}

export default FormInputText;