import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../util";

const initialState = {
    token: null,
    userId: null,
    error: null,
    fpError: null,
    loading: false,
    passwordChanged: false,
    passwordChangeable: false,
    fpeError: null,
    signedUp: false,
    checkingAuth: false
}


const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

const signUpSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        signedUp: true
    })
}
const signUpRestart = (state, action) => {
    return updateObject(state, {
        signedUp: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}


const logout = (state, action) => {
    return updateObject(state, {error: null, token: null});
}


const authCheckStart = (state, action) => {
    return updateObject(state, {checkingAuth: true});
}

const authCheckEnd= (state, action) => {
    return updateObject(state, {checkingAuth: false});
}

const checkAuth = (state, action) => {
    return {
        ...state
    };
}





const changePasswordFail = (state, action) => {
    return updateObject(state, {fpError: action.error});
}

const changePasswordSuccess = (state, action) => {
    return updateObject(state, {passwordChanged: true, fpError: null})
}

const closeForgotPassword = (state, action) => {
    return updateObject(state, {passwordChanged: false});
}

const changePasswordStart = (state, action) => {
    return updateObject(state, {passwordChangeable: true});
}

const changePasswordSent = (state, action) => {
    return updateObject(state, {fpeError: null});
}
const changePasswordError = (state, action) => {
    return updateObject(state, {fpeError: action.error, passwordChangeable: false});
}

const changePasswordEnd = (state, action) => {
    return updateObject(state, {passwordChangeable: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.SIGN_UP_SUCCESS: return signUpSuccess(state, action);
        case actionTypes.SIGN_UP_RESTART: return signUpRestart(state, action);
        case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.CHANGE_PASSWORD_FAIL: return changePasswordFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.CHECK_AUTH: return checkAuth(state, action);
        case actionTypes.AUTH_CHECK_START: return authCheckStart(state, action);
        case actionTypes.AUTH_CHECK_END: return authCheckEnd(state, action);
        case actionTypes.CLOSE_FORGOT_PASSWORD: return closeForgotPassword(state, action);
        case actionTypes.CHANGE_PASSWORD_START: return changePasswordStart(state, action);
        case actionTypes.CHANGE_PASSWORD_SENT: return changePasswordSent(state, action);
        case actionTypes.CHANGE_PASSWORD_END: return changePasswordEnd(state, action);
        case actionTypes.CHANGE_PASSWORD_ERROR: return changePasswordError(state, action);

        default:
            return state;
    }
}


export default  reducer;