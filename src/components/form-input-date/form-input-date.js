import React from 'react';
import {Calendar} from 'primereact/calendar';
import {ErrorMessage} from '../../components/error-message/error-message';
import PropTypes from 'prop-types';

class FormInputDate extends React.Component {
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
                <Calendar
                    dateFormat="dd/mm/yy"
                    placeholder={this.props.label}
                    value={this.props.formControl.value}
                    onChange={(e) => { if (this.props.onChange) this.props.onChange(e); }}
                    onBlur={(e) => { if (this.props.onBlur) this.props.onBlur(e); }}
                    showIcon={true}
                    readOnlyInput={true}
                    touchUI={true}
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

export default FormInputDate;