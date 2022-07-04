import {
    createAction,
    PrepareAction,
    PayloadActionCreator,
} from '@reduxjs/toolkit';
import { Todo } from './reducer';

export const loadTodos = createAction('todo/load', (items: Todo[]) => ({
    payload: { items },
}));

export const addTodo = {
    start: createAction('todo/add/start', (label: string) => ({
        payload: { label },
    })),
    success: createAction('todo/add/success', (item: Todo) => ({
        payload: { item },
    })),
    failure: createAction('todo/add/failure', (label: string, error: string) => ({
        payload: { label, error },
    })),
};

export const setTodoChecked = {
    start: createAction(
        'todo/set-checked/start',
        (id: number, checked: boolean) => ({ payload: { id, checked } })
    ),
    success: createAction(
        'todo/set-checked/success',
        (id: number, checked: boolean) => ({ payload: { id, checked } })
    ),
    failure: createAction(
        'todo/set-checked/failure',
        (id: number, checked: boolean) => ({ payload: { id, checked } })
    ),
};

export const removeTodo = {
    start: createAction('todo/remove/start', (id: number) => ({
        payload: { id },
    })),
    success: createAction('todo/remove/success', (id: number) => ({
        payload: { id },
    })),
    failure: createAction('todo/remove/failure', (id: number) => ({
        payload: { id },
    })),
};
