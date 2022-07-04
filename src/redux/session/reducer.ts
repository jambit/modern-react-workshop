import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_TOKEN } from '../../api';

const initialState = {
    token: DEFAULT_TOKEN,
};

export type SessionState = typeof initialState;

export const sessionReducer = createReducer(initialState, (builder) => []);
