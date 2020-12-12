import React from 'react';
import {actions} from '../../../redux/profile-reducer';
import MyPosts, {DispatchPostPropsType, MapPostPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
        profile: state.profilePage.profile,
    }
}

const MyPostsContainer = connect<MapPostPropsType,DispatchPostPropsType, {}, AppStateType >(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;