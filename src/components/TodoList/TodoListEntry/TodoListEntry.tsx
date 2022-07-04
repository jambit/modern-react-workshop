import React from 'react';
import './TodoListEntry.scss';

interface TodoListEntryProps {
    label: string;
    checked: boolean;
}

export const TodoListEntry = ({ label, checked }: TodoListEntryProps) => {
    return (
        <li className={`todo-list-entry${checked ? ' checked' : ''}`}>
            <span className="icon">{checked ? '☑' : '☐'}</span>{' '}
            <span className="label">{label}</span>
            <button className="remove">x</button>
        </li>
    );
};
