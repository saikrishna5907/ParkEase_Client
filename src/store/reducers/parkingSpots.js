import * as actionTypes from '../actions/actionTypes';

const initialState = {
    parkingSpotsByfloorAndAreaName: [],
    parkingAreaFloorNames: [],
    allParkingSpotsinArea: [] ,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PARKING_SPOTS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_PARKING_AREAS_SUCCESS:
            return {
                ...state,
                loading: false,
                parkingSpots: action.parkingSpots
            }
        case actionTypes.FETCH_PARKING_SPOTS_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_PARKING_SPOTS_BY_PARKING_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                allParkingSpotsinArea: action.allParkingSpotsinArea,
                parkingSpotsByfloorAndAreaName: action.parkingSpotsByfloorAndAreaName,
                parkingAreaFloorNames: action.parkingAreaFloorNames
            }

        default:
            return state;
    }
}
export default reducer;