const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    postsData: [
        { id: 1, message: "Hi, how are you?", likesCount: 10 },
        { id: 2, message: "It's my first post", likesCount: 23 },
        { id: 3, message: "asdfg", likesCount: 23 },
        { id: 4, message: "dghd", likesCount: 23 },
    ],
    newPostText: "it-kamasutra",
};
 
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }

}

export const addPostActionCreater = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;