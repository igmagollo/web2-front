import React from 'react';
import {Message} from 'primereact/message';

export class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) return (
            <div style={{marginTop: 6}}>
                <Message 
                    severity="error"
                    text={this.props.text}
                    style={{width: "100%"}}
                />
            </div>
        );
        return null;
    }
};
