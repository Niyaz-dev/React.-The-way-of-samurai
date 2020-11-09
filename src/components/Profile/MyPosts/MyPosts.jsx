import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";


function AddNewPostForm(props) {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={"textarea"} name={"newPostText"}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

AddNewPostForm=reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = (props) => {
    let posts = props.postsData.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
    
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postBlock}>
            <h3>
                My posts
            </h3>
            <AddNewPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );

}

export default MyPosts;