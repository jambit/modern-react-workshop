import React, { useReducer, useState } from 'react';

import { TodoListEntry } from './TodoListEntry/TodoListEntry';
import './TodoList.scss';

interface TodoItem {
    id: number;
    label: string;
    checked: boolean;
}

const initialState = {
    nextId: 7,
    items: [
        {
            id: 1,
            label: 'Make cookies',
            checked: false,
        },
        {
            id: 2,
            label: 'Go to Christmas party',
            checked: false,
        },
        {
            id: 3,
            label: 'Wish everyone a merry Christmas',
            checked: false,
        },
        {
            id: 4,
            label: 'Dress up like Santa',
            checked: true,
        },
        {
            id: 5,
            label: 'Ignore 1-3',
            checked: true,
        },
        {
            id: 6,
            label: 'Steal Christmas',
            checked: true,
        },
    ] as TodoItem[],
};

type TodoState = typeof initialState;

function reduceTodos(state: TodoState, id: number): TodoState {
    return {
        ...state,
        items: state.items.map((item) => {
            if (item.id !== id) return item;
            return {
                ...item,
                checked: !item.checked,
            };
        }),
    };
}

export const TodoList = () => {
    const [state, dispatch] = useReducer(reduceTodos, initialState);
    const [failChecked, setFailChecked] = useState(false);
    const [failInEffect, setFailInEffect] = useState(false);
    const [failCompletely, setFailCompletely] = useState(false);
    if (failCompletely) throw new Error();

    return (
        <div>
            <h2>Settings</h2>
            <ul className="todo-list">
                <TodoListEntry
                    label="Throw if a todo item is checked"
                    checked={failChecked}
                    toggleChecked={() => setFailChecked(!failChecked)}
                />
                <TodoListEntry
                    label="Throw during useEffect rather than during rendering"
                    checked={failInEffect}
                    toggleChecked={() => setFailInEffect(!failInEffect)}
                />
            </ul>
            <button onClick={() => setFailCompletely(true)}>
                Fail completely!
            </button>
            <h2>GRINCH TO DO LIST</h2>
            <ul className="todo-list">
                {state.items.map((item) => (
                    <TodoListEntry
                        key={item.id}
                        label={item.label}
                        checked={item.checked}
                        failChecked={failChecked}
                        failInEffect={failInEffect}
                        toggleChecked={() => dispatch(item.id)}
                    />
                ))}
            </ul>
        </div>
    );
};
