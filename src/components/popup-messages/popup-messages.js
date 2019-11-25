import React from 'react';
import {Growl} from 'primereact/growl';
import {PopupMessagesService} from './popup-messages-service';

export class PopupMessages extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.messages = PopupMessagesService.asObservable().subscribe(
            (message) => this.growl.show(message)
        );
    }

    componentWillUnmount() {
        this.messages.unsubscribe();
    }

    render() {
        return (
            <Growl ref={(el) => this.growl = el} />
        );
    }

}