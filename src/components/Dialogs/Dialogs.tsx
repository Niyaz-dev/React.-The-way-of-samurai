import React from 'react';
import s from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {LoginFormValuesType} from "../Login/Login";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string;
}
type NewMessageFormKeysType = Extract<keyof NewMessageFormValuesType, string>;
type OwnPropsType = {}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messageElements = state.messagesData.map(message => <Message message={message.message} key={message.id} id={message.id}/>);

    let addNewMessage = (values:NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    };
    


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messageElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType, OwnPropsType> & OwnPropsType>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormKeysType>("Enter your message","newMessageBody",[required,maxLength50],Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm);
export default Dialogs;