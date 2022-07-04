import { useReducer } from 'react';

function toggleReducer(state: boolean) {
    return !state;
}

export const useToggle = (initialValue: boolean) => {
    return useReducer(toggleReducer, initialValue);
};
