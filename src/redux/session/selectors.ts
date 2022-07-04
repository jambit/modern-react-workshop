import type { AppState } from '../createStore';

export const selectToken = (state: AppState) => state.session.token;
