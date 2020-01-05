import * as actions from '../actions/index';
import {put} from 'redux-saga/effects';
import axios from '../../axios-server';

export function* fetchMyparkingStatus(action) {
    yield put(actions.fetchParkingStatusStart());
    try{
        const res = yield axios({
            method: 'GET',
            url: `/parkingOfACarByREGO/${action.vehicleId}`,
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        const fetchedMyParkingStatus = [];

        for(let key in res.data){
            fetchedMyParkingStatus.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchParkingStatusSuccess(fetchedMyParkingStatus))
    }catch(error){
        yield put(actions.fetchParkingStatusFail(error));
    }
}