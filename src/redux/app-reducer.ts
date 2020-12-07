import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

const SET_INITIALIZED_SUCCESS = "SN/APP/SET_INITIALIZED_SUCCESS"


let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {
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
type ActionsType = InferActionsTypes<typeof actions>

export const actions ={
    initializedSuccess: () => ({
        type: SET_INITIALIZED_SUCCESS,
    } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then((a) => {
        dispatch(actions.initializedSuccess());
    })
}


export default appReducer;