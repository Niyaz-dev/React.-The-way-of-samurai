import React from 'react';
import s from './Post.module.css'
import userPhoto from "../../../../assets/images/user.png";


const Post = (props) => {
    const imgSrc = (props) => {
        debugger
        if((props.profile) && (props.profile.photos) && (props.profile.photos.large)) {
            return props.profile.photos.large;
        }
        else return userPhoto;
    }
    return (
        <div className={s.item}>
            <img src={imgSrc(props)} alt="" />
            {props.message}
            <div><span>like: {props.likesCount}</span></div>
        </div>
    );
}

export default Post;