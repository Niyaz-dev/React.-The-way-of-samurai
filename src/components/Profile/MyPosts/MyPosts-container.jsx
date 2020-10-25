import React from 'react';
import { addPostActionCreater, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from "./MyPosts";




const MyPostsContainer = (props) => {
    let state = props.store.getState();
    
    let addPost = () => {
        props.store.dispatch(addPostActionCreater());
    };

    let onPostChange = (text) => {
        debugger;
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    };

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} postsData={state.profilePage.postsData} newPostText={state.profilePage.newPostText}/>
    );
    
}

export default MyPostsContainer;