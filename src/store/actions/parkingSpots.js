import * as actionTypes from './actionTypes';

export const fetchParkingSpots = () => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_SAGA
    };
}
export const fetchParkingSpotsFail = (error) => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_FAILED,
        error: error
    }
}
export const fetchParkingSpotsStart = () => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_START
    };
}
export const fetchParkingSpotsSuccess = (parkingSpots) => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_SUCCESS,
        parkingSpots: parkingSpots
    }
}
//fetching parkingSpot by area name
export const fetchParkingSpotsByAreaNameStart = () => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_START
    }
}
export const fetchParkingSpotsByAreaNameSuccess = (allParkingSpotsinArea,parkingSpotsByfloorAndAreaName, parkingAreaFloorNames) => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_SUCCESS,
        allParkingSpotsinArea: allParkingSpotsinArea,
        parkingSpotsByfloorAndAreaName: parkingSpotsByfloorAndAreaName,
        parkingAreaFloorNames: parkingAreaFloorNames
    }
}
export const fetchParkingSpotsByAreaName = (areaName, floorName) => {
    return {
        type: actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_SAGA,
        areaName: areaName,
        floorName: floorName
    }
}