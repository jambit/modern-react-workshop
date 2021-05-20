import { createReducer } from '@reduxjs/toolkit';
import { addTodo, removeTodo, toggleTodo } from './actions';

export interface Todo {
    id: number;
    label: string;
    checked: boolean;
}

const initialTodosState = {
    nextId: 1,
    items: [] as Todo[],
};

export const todosReducer = createReducer(initialTodosState, (builder) => {
    builder
        .addCase(addTodo, (state, action) => {
            state.items.push({
                id: state.nextId,
                label: action.payload.label,
                checked: false,
            });
            state.nextId++;
        })
        .addCase(removeTodo, (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
        })
        .addCase(toggleTodo, (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (item) item.checked = !item.checked;
        });
});
