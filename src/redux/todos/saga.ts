import {
    put,
    all,
    select,
    call,
    takeLatest,
    cancelled,
    takeEvery,
    take,
} from 'redux-saga/effects';

import { api } from '../../api';
import { loadTodos, addTodo, setTodoChecked, removeTodo } from './actions';
import { Todo } from './reducer';
import { selectToken } from '..';
import { EventChannel, eventChannel } from 'redux-saga';

export function* rootTodoSaga() {
    yield all([
        takeLatest(addTodo.start, addTodoSaga),
        takeEvery(setTodoChecked.start, setTodoCheckedSaga),
        takeEvery(removeTodo.start, removeTodoSaga),
        call(fetchTodosSaga),
        call(subscribeToUpdatesSaga),
    ]);
}

export function* fetchTodosSaga() {
    try {
        const token: string = yield select(selectToken);
        const items: Todo[] = yield call(api.getTodos, token);
        yield put(loadTodos(items));
    } catch (e) {
        // todo: handle more elegantly
        console.error('Error fetching todos', e);
    }
}

export function* addTodoSaga(action: ReturnType<typeof addTodo.start>) {
    try {
        const token: string = yield select(selectToken);
        const result: Todo = yield call(
            api.addTodo,
            token,
            action.payload.label
        );
        yield put(addTodo.success(result));
    } catch (e) {
        yield put(addTodo.failure(action.payload.label, e.message));
    } finally {
        if (yield cancelled()) console.error('cancelled');
    }
}

export function* setTodoCheckedSaga(
    action: ReturnType<typeof setTodoChecked.start>
) {
    try {
        const token: string = yield select(selectToken);
        yield call(
            api.setTodoChecked,
            token,
            action.payload.id,
            action.payload.checked
        );
        yield put(
            setTodoChecked.success(action.payload.id, action.payload.checked)
        );
    } catch (e) {
        yield put(
            setTodoChecked.failure(action.payload.id, action.payload.checked)
        );
    }
}

export function* removeTodoSaga(action: ReturnType<typeof removeTodo.start>) {
    try {
        const token: string = yield select(selectToken);
        yield call(api.removeTodo, token, action.payload.id);
        yield put(removeTodo.success(action.payload.id));
    } catch (e) {
        yield put(removeTodo.failure(action.payload.id));
    }
}

function subscribeToStorage(emit: (event: StorageEvent) => void) {
    window.addEventListener('storage', emit);
    return () => window.removeEventListener('storage', emit);
}

function* subscribeToUpdatesSaga() {
    const channel: EventChannel<StorageEvent> = yield call(
        eventChannel,
        subscribeToStorage
    );

    try {
        for (;;) /* ever */ {
            // return value ignored in this sample
            const event: StorageEvent = yield take(channel);
            yield call(fetchTodosSaga);
        }
    } catch (e) {
        channel.close();
    } finally {
        if (yield cancelled()) {
            channel.close();
        }
    }
}
