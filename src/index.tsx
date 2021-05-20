import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-annie-use-your-telescope';

import { App } from './components/App/App';
import { initStore } from './redux/createStore';
import './style.scss';

function AppWithStore() {
    const store = useMemo(initStore, []);
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<AppWithStore />, document.getElementById('app'));
