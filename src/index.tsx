import 'regenerator-runtime/runtime';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-annie-use-your-telescope';

import { App } from './components/App/App';
import { createStore } from './redux/createStore';
import './style.scss';

function AppWithStore() {
    const store = useMemo(createStore, []);
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<AppWithStore />, document.getElementById('app'));
