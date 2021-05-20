import { createStore } from 'redux-dynamic-modules';
import { coreModule } from './core/coreModule';

export function initStore() {
    return createStore({}, coreModule());
}
