import React, { useRef, useState } from 'react'
import EmojiButton from './EmojiButton'
import Attachments from './Attachments'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import {ClipLoader} from 'react-spinners'
import { sendMessage } from '../../../features/chatSlice'
import SocketContext from '../../../context/SocketContext'

function ChatActions({socket}) {
    const dispatch = useDispatch();
    const [showEmojis, setShowEmojis] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const [loading, setLoading] = useState(false);
    const {activeConversation, status} = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const {token} = user
    const [message, setMessage] = useState('');
    const textRef = useRef();
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

        setLoading(true);
        let newMsg = await dispatch(sendMessage(values));
        socket.emit('send message', newMsg.payload);
        setMessage('');
        setLoading(false);
    } 
    return (
        <form className='bg-indigo-300 h-[50px] w-full flex items-center absolute bottom-0 py-2 select-none' onSubmit={(e) => SendMessageHandler(e)}>
            <div className="w-full flex items-center gap-x-2">
                <ul className='flex gap-x-2'>
                    <EmojiButton textRef={textRef} message={message} setMessage={setMessage} showEmojis={showEmojis} 
                    setShowEmojis={setShowEmojis} setShowAttachments={setShowAttachments}/>
                    <Attachments showAttachments={showAttachments} setShowAttachments={setShowAttachments} setShowEmojis={setShowEmojis}/>
                </ul>
                {/* Input */}
                <Input message={message} setMessage={setMessage} textRef={textRef}/>
                {/* Send button */}
                <button type="submit" className='btn-2'>
                    {
                        status === 'loading' && loading? <ClipLoader color="#E9EDEF"/> :
                         <SendIcon className='fill-white dark:fill-dark_svg_1' onClick={()=>{}}/>
                    }
                </button>
            </div>
        </form>
    )
}

const ChatActionsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatActions {...props} socket={socket}/>}
    </SocketContext.Consumer>
)
export default ChatActionsWithSocket