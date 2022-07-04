import { createStore } from 'redux';

interface Todo {
    id: number;
    label: string;
    checked: boolean;
}

const initialState = {
    nextId: 1,
    items: [] as Todo[],
};

type TodoState = typeof initialState;

interface AddTodoAction {
    type: 'todo/add';
    payload: {
        label: string;
    };
}

type TodoAction = AddTodoAction;

function todosReducer(
    state: TodoState | undefined,
    action: TodoAction
): TodoState {
    if (!state) return initialState;

    switch (action.type) {
        case 'todo/add':
            return {
                ...state,
                nextId: state.nextId + 1,
                items: [
                    ...state.items,
                    {
                        id: state.nextId,
                        label: action.payload.label,
                        checked: false,
                    },
                ],
            };
        default:
            return state;
    }
}

describe('basic redux', () => {
    it('returns the default state if nothing happened yet', () => {
        const store = createStore(todosReducer);
        expect(store.getState()).toEqual({
            nextId: 1,
            items: [],
        });
        expect(store.getState()).toBe(initialState);
    });

    it('modifies the store state when dispatching an action', () => {
        const store = createStore(todosReducer);
        store.dispatch({
            type: 'todo/add',
            payload: {
                label: 'Chores',
            },
        });
        expect(store.getState()).toEqual({
            nextId: 2,
            items: [
                {
                    id: 1,
                    label: 'Chores',
                    checked: false,
                },
            ],
        });
    });

    it('does not modify intialState when dispatching an action', () => {
        const store = createStore(todosReducer);
        store.dispatch({
            type: 'todo/add',
            payload: {
                label: 'Chores',
            },
        });
        expect(initialState).toEqual({
            nextId: 1,
            items: [],
        });
    });
});
