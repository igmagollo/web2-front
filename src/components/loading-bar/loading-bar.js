import React from 'react';
import {ProgressBar} from 'primereact/progressbar';

export class LoadingBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) return (
            <ProgressBar mode="indeterminate" style={{height: '6px'}}/>
        );
        return null;
    }
};
