import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-annie-use-your-telescope';
import { stopReportingRuntimeErrors } from 'react-error-overlay';

import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './style.scss';

if (process.env.NODE_ENV === 'development') {
    stopReportingRuntimeErrors(); // disables error overlays
}

ReactDOM.render(
    <ErrorBoundary render={() => <App />} />,
    document.getElementById('app')
);
// Notice how you could pass in components without wrapper if they don't have any props:
// ReactDOM.render(<ErrorBoundary render={App} />, document.getElementById('app'));
