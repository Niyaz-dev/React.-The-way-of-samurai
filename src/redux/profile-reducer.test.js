import profileReducer, {deletePost} from "./profile-reducer";
import React from "react";
import {addPostActionCreator} from "./profile-reducer";

let state = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 23},
        {id: 3, message: "asdfg", likesCount: 23},
        {id: 4, message: "dghd", likesCount: 23},
    ],
};

test('length of post should be incremented', () => {
    let action = addPostActionCreator('it-kamasutra');
    
    let newState = profileReducer(state,action);

    expect(newState.postsData.length).toBe(5);
});

test('after deleting length', () => {
    let action = deletePost(1);
    
    let newState = profileReducer(state,action);

    expect(newState.postsData.length).toBe(3);
});