import profileReducer, {actions} from "./profile-reducer";
import React from "react";
import {ProfileType} from "../types/types";

let state = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 23},
        {id: 3, message: "asdfg", likesCount: 23},
        {id: 4, message: "dghd", likesCount: 23},
    ],
    profile: null,
    status: "",
    newPostText: "",
};

test('length of post should be incremented', () => {
    let action = actions.addPostActionCreator('it-kamasutra');
    
    let newState = profileReducer(state,action);

    expect(newState.postsData.length).toBe(5);
});

test('after deleting length', () => {
    let action = actions.deletePost(1);
    
    let newState = profileReducer(state,action);

    expect(newState.postsData.length).toBe(3);
});