import { createReducer } from '@reduxjs/toolkit';
import { addTodo, loadTodos, removeTodo, setTodoChecked } from './actions';

export interface Todo {
    id: number;
    label: string;
    checked: boolean;
}

const initialTodosState = {
    items: [] as Todo[],
};

export const todosReducer = createReducer(initialTodosState, (builder) => {
    builder
        .addCase(loadTodos, (state, action) => {
            state.items = action.payload.items;
        })
        .addCase(addTodo.success, (state, action) => {
            state.items.push(action.payload.item);
        })
        .addCase(removeTodo.success, (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
        })
        .addCase(setTodoChecked.success, (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (item) item.checked = action.payload.checked;
        });
});
