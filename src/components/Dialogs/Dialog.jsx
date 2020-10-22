import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/state';
import s from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
// import {dialogsData} from './../../index.js'

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;


    let dialogElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messageElements = state.messagesData.map(message => <Message message={message.message} id={message.id} />);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    };
    let onNewMessageChange = (evt) => {
        let body = evt.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
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
                <div>
                    <div><textarea value={newMessageBody}
                    onChange={onNewMessageChange}
                     placeholder="Enter your message"></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;