import { combineReducers } from 'redux';
import { IModule } from 'redux-dynamic-modules';
import { InferState } from '../../utils/reduxUtils';
import { todosReducer } from './todos/reducer';

const reducer = combineReducers({
    todos: todosReducer,
    // ... more reducers
});

export interface TodosState {
    todos: InferState<typeof reducer>;
}

export default function todosModule(): IModule<TodosState> {
    return {
        id: 'todos', // unique id
        reducerMap: {
            todos: reducer,
        },
    };
}
