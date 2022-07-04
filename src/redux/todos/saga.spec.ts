import { eventChannel } from '@redux-saga/core';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { ProviderNextF, throwError } from 'redux-saga-test-plan/providers';
import { CallEffectDescriptor, select } from 'redux-saga/effects';
import { selectToken } from '..';
import { api } from '../../api';
import { addTodo } from './actions';
import { Todo } from './reducer';
import {
    rootTodoSaga,
    addTodoSaga,
    fetchTodosSaga,
    subscribeToStorage,
    subscribeToUpdatesSaga,
} from './saga';

describe('subscribeToUpdateSaga', () => {
    const close = jest.fn();
    const channel = eventChannel((emitter: (e: any) => void) => () => {});
    channel.close = close;
    const event = { name: 'my-event' };

    beforeEach(() => {
        close.mockReset();
    });

    it('takes a storage event and calls fetchTodosSaga', () => {
        testSaga(subscribeToUpdatesSaga)
            .next()
            .call(eventChannel, subscribeToStorage)
            .next(channel)
            .take(channel)
            .next(event)
            .call(fetchTodosSaga)
            .next();
    });

    it('takes multiple storage event and calls fetchTodosSaga', () => {
        testSaga(subscribeToUpdatesSaga)
            .next()
            .call(eventChannel, subscribeToStorage)
            .next(channel)
            .take(channel)
            .next(event)
            .call(fetchTodosSaga)
            .next()
            .take(channel)
            .next(event)
            .call(fetchTodosSaga)
            .next()
            .take(channel)
            .next(event)
            .call(fetchTodosSaga)
            .next();
    });

    it('calls close when an error is thrown', () => {
        testSaga(subscribeToUpdatesSaga)
            .next()
            .call(eventChannel, subscribeToStorage)
            .next(channel)
            .take(channel)
            .next(event)
            .call(fetchTodosSaga)
            .next()
            .throw(new Error('bla'))
            .next()
            .isDone();
        expect(close).toHaveBeenCalled();
    });
});

describe('addTodoSaga', () => {
    it('puts addTodo.success when request was successful', () => {
        const result: Todo = { id: 1, label: 'woot', checked: false };
        const action = addTodo.start('woot');
        return (
            expectSaga(addTodoSaga, action)
                .put(addTodo.success(result))
                // .withState({
                //     session: {
                //         token: "blubb"
                //     }
                // })
                .provide([
                    [select(selectToken), 'blubb'],
                    [matchers.call.fn(api.addTodo), result],
                ])
                .run()
        );
    });

    it('puts addTodo.success too when request was successful', () => {
        const result: Todo = { id: 1, label: 'woot', checked: false };
        const action = addTodo.start('woot');
        return expectSaga(addTodoSaga, action)
            .put(addTodo.success(result))
            .withState({
                session: {
                    token: 'real token',
                },
            })
            .provide([
                [select(selectToken), 'fake token'],
                [
                    matchers.call(
                        api.addTodo,
                        'fake token',
                        action.payload.label
                    ),
                    result,
                ],
            ])
            .run();
    });

    it('puts addTodo.failure when request was not successful', () => {
        const action = addTodo.start('woot');
        return expectSaga(addTodoSaga, action)
            .put(addTodo.failure(action.payload.label, 'blaa'))
            .not.put.actionType(addTodo.success.type)
            .withState({
                session: {
                    token: 'blubb',
                },
            })
            .provide([
                [matchers.call.fn(api.addTodo), throwError(new Error('blaa'))],
            ])
            .run();
    });
});

describe('todoSaga', () => {
    it('puts addTodo.success when addTodoSaga ran successfully', () => {
        const result: Todo = { id: 1, label: 'woot', checked: false };
        const action = addTodo.start('woot');
        return expectSaga(rootTodoSaga)
            .put(addTodo.success(result))
            .provide([
                [matchers.call.fn(fetchTodosSaga), undefined],
                [matchers.call.fn(subscribeToUpdatesSaga), undefined],
                [select(selectToken), 'blubb'],
                [matchers.call.fn(api.addTodo), result],
            ])
            .dispatch(action)
            .silentRun();
    });
});
