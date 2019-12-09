import * as actionTypes from './actionTypes';

export const fetchParkingAreas = () => {
    return {
        type: actionTypes.FETCH_PARKING_AREAS_SAGA
    };
}
export const fetchParkingAreasFail = (error) => {
    return {
        type: actionTypes.FETCH_PARKING_AREAS_FAILED,
        error: error
    }
}

export const fetchParkingAreasStart = () => {
    return{
        type: actionTypes.FETCH_PARKING_AREAS_START
    }
}
export const fetchParkingAreasSuccess = (parkingAreas) => {
    return{
        type: actionTypes.FETCH_PARKING_AREAS_SUCCESS,
        parkingAreas: parkingAreas
    }
}
export const fetchParkingAreasByNameSuccess = (parkingAreasByName) => {
    return{
        type: actionTypes.FETCH_PARKING_AREAS_BY_NAME_SUCCESS,
        parkingAreasByName: parkingAreasByName
    }
}
export const fetchParkingAreasByName = (listOfAreaNames) => {
        return {
            type: actionTypes.FETCH_PARKING_AREAS_BY_NAME_SAGA,
            listOfAreaNames: listOfAreaNames
    }
}