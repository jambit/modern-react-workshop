import React, { useEffect } from 'react';
import {
    ErrorBoundaryFallbackProps,
    withErrorBoundary,
} from '../../ErrorBoundary';
import './TodoListEntry.scss';

interface TodoListEntryProps {
    label: string;
    checked: boolean;
    toggleChecked?: () => void;
    failChecked?: boolean;
    failInEffect?: boolean;
}

const TodoListEntryUnsafe = ({
    label,
    checked,
    failChecked,
    failInEffect,
    toggleChecked,
}: TodoListEntryProps) => {
    useEffect(() => {
        if (failChecked && checked && !failInEffect) throw new Error();
    }, [failChecked, failInEffect, checked]);

    if (failChecked && checked && failInEffect) throw new Error();
    return (
        <li className={`todo-list-entry${checked ? ' checked' : ''}`}>
            <span className="icon" onClick={toggleChecked}>
                {checked ? '☑' : '☐'}
            </span>{' '}
            <span className="label" onClick={toggleChecked}>
                {label}
            </span>
        </li>
    );
};

export const TodoListEntryError = ({ retry }: ErrorBoundaryFallbackProps) => (
    <li className="todo-list-entry">
        <span>Failed rendering this todo item</span>
        <button onClick={retry}>Retry</button>
    </li>
);

export const TodoListEntry = withErrorBoundary(
    TodoListEntryUnsafe,
    TodoListEntryError
);
