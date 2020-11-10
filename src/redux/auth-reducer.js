import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"
const UNFOLLOW = "UNFOLLOW";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(responce => {
        if (responce.data.resultCode === 0) {
            let {id, login, email} = responce.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(responce => {
        if (responce.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message = responce.data.messages.length > 0 ? responce.data.messages[0] : "Some error";
            dispatch(stopSubmit("login",{_error: responce.data.messages}));
        }
    });
}

export const logout = () => (dispatch) => {
    authAPI.logout().then(responce => {
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
}

export default authReducer;