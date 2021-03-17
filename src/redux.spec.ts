import {
    configureStore,
    createAction,
    createReducer,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

interface Todo {
    id: number;
    label: string;
    checked: boolean;
}

const initialTodosState = {
    nextId: 1,
    items: [] as Todo[],
};

const addTodo = createAction('todo/add', (label: string) => ({
    payload: { label },
}));

const todosReducer = createReducer(initialTodosState, (builder) => {
    builder.addCase(addTodo, (state, action) => {
        state.items.push({
            id: state.nextId,
            label: action.payload.label,
            checked: false,
        });
        state.nextId++;
    });
});

const todosSlice = createSlice({
    name: 'slice-todos',
    initialState: initialTodosState,
    reducers: {
        add(state, action: PayloadAction<{ label: string }>) {
            state.items.push({
                id: state.nextId,
                label: action.payload.label,
                checked: false,
            });
            state.nextId++;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodo, (state, action) => {
            state.items.push({
                id: state.nextId,
                label: action.payload.label,
                checked: false,
            });
            state.nextId++;
        });
    },
});

describe('basic redux', () => {
    const reducer = combineReducers({
        todos: todosReducer,
    });
    it('returns the default state if nothing happened yet', () => {
        const store = configureStore({ reducer });
        expect(store.getState()).toEqual({
            todos: {
                nextId: 1,
                items: [],
            },
        });
        expect(store.getState().todos).toBe(initialTodosState);
    });

    it('modifies the store state when dispatching an action', () => {
        const store = configureStore({ reducer });
        store.dispatch(addTodo('Chores'));
        expect(store.getState()).toEqual({
            todos: {
                nextId: 2,
                items: [
                    {
                        id: 1,
                        label: 'Chores',
                        checked: false,
                    },
                ],
            },
        });
    });

    it('does not modify intialState when dispatching an action', () => {
        const store = configureStore({ reducer });
        store.dispatch(addTodo('Chores'));
        expect(initialTodosState).toEqual({
            nextId: 1,
            items: [],
        });
    });
});

describe('sliced redux', () => {
    const reducer = combineReducers({
        todos: todosSlice.reducer,
    });
    it('returns the default state if nothing happened yet', () => {
        const store = configureStore({ reducer });
        expect(store.getState()).toEqual({
            todos: {
                nextId: 1,
                items: [],
            },
        });
        expect(store.getState().todos).toBe(initialTodosState);
    });

    it('modifies the store state when dispatching an action', () => {
        const store = configureStore({ reducer });
        store.dispatch(todosSlice.actions.add({ label: 'Chores' }));
        expect(store.getState()).toEqual({
            todos: {
                nextId: 2,
                items: [
                    {
                        id: 1,
                        label: 'Chores',
                        checked: false,
                    },
                ],
            },
        });
    });

    it('does not modify intialState when dispatching an action', () => {
        const store = configureStore({ reducer });
        store.dispatch(todosSlice.actions.add({ label: 'Chores' }));
        expect(initialTodosState).toEqual({
            nextId: 1,
            items: [],
        });
    });

    it('modifies the store state when dispatching an external action', () => {
        const store = configureStore({ reducer });
        store.dispatch(addTodo('Chores'));
        expect(store.getState()).toEqual({
            todos: {
                nextId: 2,
                items: [
                    {
                        id: 1,
                        label: 'Chores',
                        checked: false,
                    },
                ],
            },
        });
    });
});
