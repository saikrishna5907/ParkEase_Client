import * as actionTypes from '../actions/actionTypes';
const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
}
const reducer = (state= initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_USER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_USER_FAILED: 
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                token: action.token,
                userId: action.userId
            }
        case actionTypes.AUTH_LOGOUT_SAGA:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
    }
}

export default reducer;