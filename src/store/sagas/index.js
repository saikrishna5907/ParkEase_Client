import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {fetchParkingAreasSaga, fetchParkingAreasByName} from './parkingArea';
import {fetchParkingSpotsSaga, fetchParkingSpotsByAreaNameSaga} from './parkingSpots';
import {fetchMyparkingStatus} from './checkStatus';
import {  checkAuthTimeoutSaga, authenticateUserSaga, authCheckStateSaga, logoutSaga } from './auth';
export function* watchParkingAreas() {
    yield takeEvery(actionTypes.FETCH_PARKING_AREAS_SAGA, fetchParkingAreasSaga);
    yield takeEvery(actionTypes.FETCH_PARKING_AREAS_BY_NAME_SAGA, fetchParkingAreasByName)
}
export function* watchParkingSpots() {
    yield takeEvery(actionTypes.FETCH_PARKING_SPOTS_SAGA, fetchParkingSpotsSaga);
    yield takeEvery(actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_SAGA, fetchParkingSpotsByAreaNameSaga);
}
export function* watchCheckStatus() {
    yield takeEvery(actionTypes.FETCH_PARKING_STATUS_SAGA, fetchMyparkingStatus);
}
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER_SAGA, authenticateUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga )
}