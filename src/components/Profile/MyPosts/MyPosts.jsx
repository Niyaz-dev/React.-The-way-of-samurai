import React from 'react';
import { addPostActionCreater, updateNewPostTextActionCreator } from '../../../redux/state';
import s from './MyPosts.module.css'
import Post from './Post/Post';




const MyPosts = (props) => {
    debugger;
    // const postsData = [
    //     {id:1, message: "Hi, how are you?", likesCount: 10},
    //     {id:2, message: "It's my first post", likesCount: 23},
    //     {id:3, message: "asdfg", likesCount: 23},
    //     {id:4, message: "dghd", likesCount: 23},
    // ];

    let posts = props.postsData.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreater());
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        // props.updateNewPostText(text);
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    };

    return (
        <div className={s.postBlock}>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
    
}

export default MyPosts;