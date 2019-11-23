import React from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

class Bootstrap extends React.Component {
    render() {
        return (
            <div className="p-grid p-align-center p-justify-center"
                style={{ height: "100vh", padding: 0, margin: 0, boxSizing: "border-box" }}>
                <ProgressSpinner className="p-col p-col-align-center" />
            </div>
        );
    }
}

export default Bootstrap;