import {
    AUTH_CHECK_END,
    AUTH_CHECK_START,
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS, CHANGE_PASSWORD_END, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SENT,
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_SUCCESS,
    CHECK_AUTH, CLOSE_FORGOT_PASSWORD,
    LOGOUT, SIGN_UP_RESTART, SIGN_UP_SUCCESS
} from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}


export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    return {
        type: LOGOUT
    }
}

//sign up stuff
export const signUpSuccess = () => {
    return {
        type: SIGN_UP_SUCCESS
    }
}

export const signUpRestart = () => {
    return {
        type: SIGN_UP_RESTART
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        let url = isSignUp? 'https://nodejsauthjustin.herokuapp.com/auth/signup' : 'https://nodejsauthjustin.herokuapp.com/auth/login';
        axios.post(url, {
            email,
            password
        })
            .then(response => {

                if(isSignUp){
                    dispatch(signUpSuccess())
                }
                else{
                    localStorage.setItem('token', response.data.token);
                    dispatch(authSuccess(response.data.token));
                }

            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    }
}

//Check authentication from local storage

export const authCheckStart = () => {
    return {
        type: AUTH_CHECK_START
    }
}

export const authCheckEnd = () => {
    return {
        type: AUTH_CHECK_END
    }
}

export const checkAuth = () => {
    return dispatch => {
        dispatch(authCheckStart())
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
            dispatch(authCheckEnd())
        }
        else{
            axios.get('https://nodejsauthjustin.herokuapp.com/auth/verify-token/',
                {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(response => {
                    if(response.data.result){
                        dispatch(authCheckEnd())
                        dispatch(authSuccess(token))
                    }
                    else{
                        dispatch(authCheckEnd())
                        dispatch(logout())
                    }

                })
                .catch(err => {
                    console.log(err);
                    dispatch(authCheckEnd())
                    dispatch(authFail(err.response.data.error));
                });
        }


    }
}

// Forgot password mechanism

export const passwordChangeSuccess = () => {
    return {
        type: CHANGE_PASSWORD_SUCCESS
    }
}

export const passwordChangeFail = (error) => {
    return {
        type: CHANGE_PASSWORD_FAIL,
        error: error
    }
}


export const closeForgotPassword = () => {
    return {
        type: CLOSE_FORGOT_PASSWORD
    }
}

export const onForgotPassword = (email, password1, password2, id, changeable) => {
    return dispatch => {
        console.log("Chang", changeable)
        if(changeable){
            axios.post(`https://nodejsauthjustin.herokuapp.com/auth/forgot-password/${id}`, {
                email,
                password1,
                password2
            })
                .then(response => {
                    console.log(response);
                    dispatch(passwordChangeSuccess());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(passwordChangeFail(err.response.data.error));
                });
        }
        else{
            dispatch(passwordChangeFail("Time limit exceeded!"));
        }

    }
}


// Change Password Initiation

export const passwordChangeStart = () => {
    return {
        type: CHANGE_PASSWORD_START,
    }
}
export const passwordChangeEnd = () => {
    localStorage.removeItem('e');
    return {
        type: CHANGE_PASSWORD_END,
    }
}
export const passwordChangeSent = () => {
    return {
        type: CHANGE_PASSWORD_SENT,
    }
}

export const passwordChangeError = (error) => {
    return {
        type: CHANGE_PASSWORD_ERROR,
        error
    }
}

export const onChangePassword = (email) => {
    return dispatch => {
        dispatch(passwordChangeStart());
        localStorage.setItem('e', new Date(new Date().getTime() + 600000));
        setTimeout(()=>dispatch(passwordChangeEnd()), 60000)
        axios.post('https://nodejsauthjustin.herokuapp.com/auth/forgot-password-initiate',{
            email
        })
            .then(response => {
                dispatch(passwordChangeSent())
            })
            .catch(err => {
                dispatch(passwordChangeError(err.response.data.error))
            });

    }
}


