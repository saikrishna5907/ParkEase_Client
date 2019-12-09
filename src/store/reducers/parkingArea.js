import * as actionTypes from '../actions/actionTypes';

const initialState = {
    parkingAreas: [],
    parkingAreasByName: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PARKING_AREAS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_PARKING_AREAS_SUCCESS:
            return {
                ...state,
                loading: false,
                parkingAreas: action.parkingAreas
            }
        case actionTypes.FETCH_PARKING_AREAS_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_PARKING_AREAS_BY_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                parkingAreasByName: action.parkingAreasByName
            }
        default:
            return state;
    }
}
export default reducer;