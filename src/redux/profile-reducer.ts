import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 23},
        {id: 3, message: "asdfg", likesCount: 23},
        {id: 4, message: "dghd", likesCount: 23},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    // newPostText: "",
};
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>


const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case DELETE_POST:
            return {
                ...state, postsData: state.postsData.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }

}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: ADD_POST, newPostText}),
    setUserProfile: (profile: ProfileType | null) => ({type: SET_USER_PROFILE, profile}),
    setStatus: (status: string) => ({type: SET_STATUS, status}),
    deletePost: (postId: number) => ({type: DELETE_POST, postId}),
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos}),
}

export const getUserProfile = (userId: number): ThunkType => (dispatch) => {
    return profileAPI.getProfile(userId).then((userData) => {
        dispatch(actions.setUserProfile(userData));
    });
};
export const clearProfile = (): ThunkType => async (dispatch) => {
    dispatch(actions.setStatus(''));
    dispatch(actions.setUserProfile(null));
};
export const getStatus = (userId: number): ThunkType => (dispatch) => {
    return profileAPI.getStatus(userId).then((status) => {
        dispatch(actions.setStatus(status));
    });
};
export const updateStatus = (status: string): ThunkType => (dispatch) => {
    return profileAPI.updateStatus(status).then((response) => {
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    });
};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getSate) => {
    const userId = getSate().auth.userId
    let response = await profileAPI.saveProfile(profile);

    if (response.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}));
        return Promise.reject(response.messages[0]);
    }
};

export default profileReducer;