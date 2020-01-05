import * as actions from '../actions/index';
import { delay, put } from 'redux-saga/effects';
import axios from '../../axios-server';
import * as jwt_decode from "jwt-decode";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}
export function* authenticateUserSaga(action) {
    yield put(actions.authUserStart());
    const authData = {
        email: action.email,
        password: action.password
    }
    try {
        const res = yield axios.post('/login', authData);
        const decodedData = JSON.stringify(jwt_decode(res.data.token))
        const expirationInUnix = JSON.parse(decodedData).exp;
        const expirationDate = yield new Date(expirationInUnix * 1000);
        yield localStorage.setItem('token', res.data.token);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.userId);
        yield put(actions.authUserSuccess(res.data.token, res.data.userId));
    } catch (error) {
        yield actions.authUserFailed(error);
    }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout());
    }
    else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authUserSuccess(token, userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}