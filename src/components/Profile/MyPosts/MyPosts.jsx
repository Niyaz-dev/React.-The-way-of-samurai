import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(10);


function AddNewPostForm(props) {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={"newPostText"} validate={[required, maxLength]} placeholder={"Add a post here"}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

AddNewPostForm=reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = React.memo((props) => {
    let posts = props.postsData.map(post => <Post profile={props.profile} message={post.message} likesCount={post.likesCount}/>);

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

});

export default MyPosts;