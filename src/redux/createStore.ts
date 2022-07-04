import {
    CombinedState,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import { sessionReducer } from './session/reducer';
import { todosReducer } from './todos/reducer';

const reducer = combineReducers({
    session: sessionReducer,
    todos: todosReducer,
});

export function createStore() {
    return configureStore({
        reducer,
    });
}

type InferState<T> = T extends (...args: any[]) => CombinedState<infer S>
    ? S
    : never;

export type AppState = InferState<typeof reducer>;
