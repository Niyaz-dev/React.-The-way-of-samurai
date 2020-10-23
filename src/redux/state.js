import { act } from "react-dom/test-utils";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY= "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE= "SEND_MESSAGE";

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: "Hi, how are you?", likesCount: 10 },
                { id: 2, message: "It's my first post", likesCount: 23 },
                { id: 3, message: "asdfg", likesCount: 23 },
                { id: 4, message: "dghd", likesCount: 23 },
            ],
            newPostText: "it-kamasutra",
        },
        dialogsPage: {
            dialogsData: [
                { id: 1, name: "Dimych" },
                { id: 2, name: "Andrey" },
                { id: 3, name: "Sveta" },
                { id: 4, name: "Sasha" },
                { id: 5, name: "Viktor" },
                { id: 6, name: "Valera" },
            ],
            messagesData: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How is your it-kamasutra" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Yo" },
                { id: 5, message: "Yo" },
                { id: 6, message: "Yo" },
            ],
            newMessageBody: "",
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarReducer =  sidebarReducer(this._state.sidebarReducer, action);
        this._callSubscriber(this._state);
    },
}



////

export default store;