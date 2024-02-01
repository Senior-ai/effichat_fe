import React, { useState } from 'react'
import EmojiPicker from './EmojiPicker'
import Attachments from './Attachments'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import {ClipLoader} from 'react-spinners'
import { sendMessage } from '../../../features/chatSlice'

export default function ChatActions() {
    const dispatch = useDispatch();
    const {activeConversation, status} = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const {token} = user
    const [message, setMessage] = useState('');
    const values = {
        message,
        convoId: activeConversation._id,
        files: [],
        token
    }
    const SendMessageHandler = async (e) => {
        e.preventDefault();
        if (message === '') {
            return;
        }
        await dispatch(sendMessage(values));
        setMessage('');
    } 
    return (
        <form className='bg-indigo-300 h-[50px] w-full flex items-center absolute bottom-0 py-2 select-none' onSubmit={(e) => SendMessageHandler(e)}>
            <div className="w-full flex items-center gap-x-2">
                <ul className='flex gap-x-2'>
                    <EmojiPicker/>
                    <Attachments/>
                </ul>
                {/* Input */}
                <Input message={message} setMessage={setMessage}/>
                {/* Send button */}
                <button type="submit" className='btn-2'>
                    {
                        status === 'loading'? <ClipLoader color="#E9EDEF"/> :
                         <SendIcon className='fill-white dark:fill-dark_svg_1' onClick={()=>{}}/>
                    }
                </button>
            </div>
        </form>
    )
}
