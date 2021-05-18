import {
    CombinedState,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { sessionReducer } from './session/reducer';
import { todosReducer } from './todos/reducer';
import { rootTodoSaga } from './todos/saga';

function* rootSaga() {
    yield all([rootTodoSaga()]);
}

const reducer = combineReducers({
    session: sessionReducer,
    todos: todosReducer,
});

export function createStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        middleware: [sagaMiddleware],
        reducer,
    });
    sagaMiddleware.run(rootSaga);
    return store;
}

type InferState<T> = T extends (...args: any[]) => CombinedState<infer S>
    ? S
    : never;

export type AppState = InferState<typeof reducer>;
