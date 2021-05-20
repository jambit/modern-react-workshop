import { TodosState } from "..";

export const selectTodos = (state: TodosState) => state.todos.todos.items;
