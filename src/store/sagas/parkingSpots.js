import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchParkingSpotsSaga(action) {
    yield put(actions.fetchParkingSpotsStart());
    try {
        const res = yield axios.get('http://localhost:5001/api/parkingSpots');
        const fetchedParkingSpots = [];

        for (let key in res.data) {
            fetchedParkingSpots.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchParkingSpotsSuccess(fetchedParkingSpots));
    } catch (error) {
        yield put(actions.fetchParkingSpotsFail(error.response));
    }
}
export function* fetchParkingSpotsByAreaNameSaga(action) {
    yield put(actions.fetchParkingSpotsByAreaNameStart());
    try {
        const res = yield axios.get(`http://localhost:5001/api/parkingSpotsInParticularArea/${action.areaName}`);
        const fetchedParkingSpotsByfloorAndAreaName = [];
        const fetchedParkingAreaFloorNames = [];
        const fetchedAllParkingSpotsinArea=[];
        for (let key in res.data) {
            //pushing only the requested floor ParkingSpots to array
            if (res.data[key].floorName === action.floorName) {
                fetchedParkingSpotsByfloorAndAreaName.push({
                    ...res.data[key],
                    id: key
                });

            }
        }
        for (let key in res.data) {
                fetchedAllParkingSpotsinArea.push({
                    ...res.data[key],
                    id: key
                });
        }
        // fetchedParkingAreaFloorNames.push("Select");
        for (let key in res.data) {
            if (!fetchedParkingAreaFloorNames.includes(res.data[key].floorName)) {
                fetchedParkingAreaFloorNames.push(res.data[key].floorName);
            }
        }
        // console.log(fetchedParkingAreaFloorNames)
        yield put(actions.fetchParkingSpotsByAreaNameSuccess(fetchedAllParkingSpotsinArea, fetchedParkingSpotsByfloorAndAreaName, fetchedParkingAreaFloorNames));
    } catch (error) {
        yield put(actions.fetchParkingSpotsFail(error.response));
    }
}