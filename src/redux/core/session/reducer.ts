import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    token: 'abc123!',
};

export const sessionReducer = createReducer(initialState, (builder) => {});
