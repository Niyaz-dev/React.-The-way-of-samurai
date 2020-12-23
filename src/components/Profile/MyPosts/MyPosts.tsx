import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {LoginFormValuesType} from "../../Login/LoginPage";
import {PostType, ProfileType} from "../../../types/types";

const maxLength = maxLengthCreator(10);

type PropsType = {
    
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

type AddPostFormValuesType = {
    newPostText: string
}

const AddNewPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddPostFormValuesTypeKeys>("Your post","newPostText",[required],Input)}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

 let AddPostForm = reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export type MapPostPropsType = {
    postsData: Array<PostType>
    profile: ProfileType | null
}

export type DispatchPostPropsType = {
    addPost: (newPostText: string) => void
}
const MyPosts:React.FC<MapPostPropsType & DispatchPostPropsType> = (props) => {
    let posts = props.postsData.map(post => <Post profile={props.profile} message={post.message} likesCount={post.likesCount}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postBlock}>
            <h3>
                My posts
            </h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );

}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;