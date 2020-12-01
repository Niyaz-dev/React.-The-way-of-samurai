import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS"

export type InitialStateType = {
    initialized: boolean,
};

let initialState: InitialStateType = {
    initialized: false,
};

const appReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }

}

type InitializedSuccessActiontype = {
    type: typeof SET_INITIALIZED_SUCCESS,
};

export const initializedSuccess = ():InitializedSuccessActiontype => ({
    type: SET_INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then((a) => {
        dispatch(initializedSuccess());
    })
}


export default appReducer;