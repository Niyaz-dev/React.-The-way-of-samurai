import React from 'react';
import s from './Post.module.css'
import userPhoto from "../../../../assets/images/user.png";
import {PostType, ProfileType} from "../../../../types/types";

type PropsType = {
    message: string
    likesCount: number
    profile: ProfileType | null
}

const Post: React.FC<PropsType> = (props) => {
    const imgSrc = (props: React.PropsWithChildren<PropsType>) => {
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