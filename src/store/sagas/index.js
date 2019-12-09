import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {fetchParkingAreasSaga, fetchParkingAreasByName} from './parkingArea';
import {fetchParkingSpotsSaga, fetchParkingSpotsByAreaNameSaga} from './parkingSpots';

export function* watchParkingAreas() {
    yield takeEvery(actionTypes.FETCH_PARKING_AREAS_SAGA, fetchParkingAreasSaga);
    yield takeEvery(actionTypes.FETCH_PARKING_AREAS_BY_NAME_SAGA, fetchParkingAreasByName)
}
export function* watchParkingSpots() {
    yield takeEvery(actionTypes.FETCH_PARKING_SPOTS_SAGA, fetchParkingSpotsSaga);
    yield takeEvery(actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_SAGA, fetchParkingSpotsByAreaNameSaga);
}