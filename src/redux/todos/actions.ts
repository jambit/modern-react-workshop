import { createAction } from '@reduxjs/toolkit';

export const addTodo = createAction('todo/add', (label: string) => ({
    payload: { label },
}));

export const removeTodo = createAction('todo/remove', (id: number) => ({
    payload: { id },
}));

export const toggleTodo = createAction('todo/toggle', (id: number) => ({
    payload: { id },
}));
