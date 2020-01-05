import * as actionTypes from '../actions/actionTypes';
const initialState = {
    myParkingStatus: [],
    loading: false
}
const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PARKING_STATUS_START: 
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_PARKING_STATUS_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.FETCH_PARKING_STATUS_SUCCESS:
            return {
                ...state,
                myParkingStatus: action.myParkingStatus,
                loading: false
            }
        default:
            return state;
    }
}
export default reducer;