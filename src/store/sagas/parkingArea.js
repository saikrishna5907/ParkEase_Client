import * as actions from '../actions/index';
import { put} from 'redux-saga/effects';
import axios from '../../axios-server';

export function* fetchParkingAreasSaga(action) {
    yield put(actions.fetchParkingAreasStart());
    try {
        const res = yield axios({
            method: 'GET',
            url: '/parkingAreas',
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        const fetchedParkingAreas = [];

        for (let key in res.data) {
            fetchedParkingAreas.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchParkingAreasSuccess(fetchedParkingAreas));
    } catch (error) {
        yield put(actions.fetchParkingAreasFail(error.response));
    }
}
export function* fetchParkingAreasByName(action) {
    yield put(actions.fetchParkingAreasStart());
    try {
        const res = yield axios({
            method: 'GET',
            url: '/parkingAreas',
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        const fetchedParkingAreas = [];

        for (let key in res.data) {
            if (action.listOfAreaNames.includes(res.data[key].name)) {
                fetchedParkingAreas.push({
                    ...res.data[key],
                    id: key
                })
            }
        }
        yield put(actions.fetchParkingAreasByNameSuccess(fetchedParkingAreas));
    } catch (error) {
        yield put(actions.fetchParkingAreasFail(error.response));
    }
} 