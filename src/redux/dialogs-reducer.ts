import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = "SN/DIALOGS/SEND_MESSAGE";

type DialogType = {
    id: number,
    name: string,
};
type MessageType = {
    id: number,
    message: string,
};
let initialState = {
    dialogsData: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
        {id: 6, message: "Yo"},
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return  {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}],
            };
        default:
            return state;
    }
}

export const actions = {
sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const)
}


export default dialogsReducer;