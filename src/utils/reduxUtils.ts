import { CombinedState } from 'redux';

export type InferState<T> = T extends (...args: any[]) => CombinedState<infer S>
    ? S
    : never;
