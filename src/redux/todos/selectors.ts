import type { AppState } from '../createStore';

export const selectTodos = (state: AppState) => state.todos.items;
