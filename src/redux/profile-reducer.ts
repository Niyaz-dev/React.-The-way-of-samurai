import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

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
    newPostText: "",
};
export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action:any):InitialStateType => {
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
                newPostText: "",
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

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST, 
    newPostText: string
};
export const addPostActionCreator = (newPostText: string):AddPostActionCreatorActionType => ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType | null
};
export const setUserProfile = (profile: ProfileType | null):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
};
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
};
export const deletePost = (postId: number):DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
};
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId: number) => (dispatch:any) => {
    return usersAPI.getProfile(userId).then((response: any)=> {
        dispatch(setUserProfile(response.data));
    });
};

export const clearProfile = () => (dispatch:any) => {
    dispatch(setStatus(''));
    dispatch(setUserProfile(null));
};

export const getStatus = (userId: number) => (dispatch:any) => {
    return profileAPI.getStatus(userId).then((response: any) => {
        dispatch(setStatus(response.data));
    });
};

export const updateStatus = (status: string) => (dispatch:any) => {
    return profileAPI.updateStatus(status).then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    });
};

export const savePhoto = (file: any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch:any, getSate:any) => {
    const userId = getSate().auth.userId
    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;