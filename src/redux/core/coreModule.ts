import { combineReducers } from 'redux';
import { IModule } from 'redux-dynamic-modules';
import { InferState } from '../../utils/reduxUtils';
import { sessionReducer } from './session/reducer';

const reducer = combineReducers({
    session: sessionReducer,
    // ... more reducers
});

export interface CoreState {
    core: InferState<typeof reducer>;
}

export function coreModule(): IModule<CoreState> {
    return {
        id: 'core', // unique id
        reducerMap: {
            core: reducer,
        },
    };
}
