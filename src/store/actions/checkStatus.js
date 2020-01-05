import * as actionTypes from './actionTypes';

export const fetchParkingStatusStart= ( ) => {
    return {
        type: actionTypes.FETCH_PARKING_STATUS_START
    }
}
export const fetchParkingStatusFail = (error) => {
    return {
        type: actionTypes.FETCH_PARKING_STATUS_FAILED,
        error: error
    }
}
export const fetchParkingStatusSuccess = (myParkingStatus) =>{
    return {
        type: actionTypes.FETCH_PARKING_STATUS_SUCCESS,
        myParkingStatus: myParkingStatus
    }
}

export const fetchMyParkingStatus = (vehicleId, token) => {
    // console.log('aaction'+ vechicleId)
    return {
        type: actionTypes.FETCH_PARKING_STATUS_SAGA,
        vehicleId: vehicleId,
        token: token
    }
}