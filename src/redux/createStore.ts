import {
    CombinedState,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import { todosReducer } from './todos/reducer';

const reducer = combineReducers({
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
