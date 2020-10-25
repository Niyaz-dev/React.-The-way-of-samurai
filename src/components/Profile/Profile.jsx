import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPosts-container";


const Profile = (props) => {

    return (
        <div >
            <ProfileInfo />
            <MyPostsContainer store={props.store} />
        </div>
    );
}

export default Profile;