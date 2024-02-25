import React from 'react';
import { dateHandler } from '../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateConversation } from '../../features/chatSlice';
import { getConversationId, getRelevantName, getRelevantPic } from '../../utils/chat';
import SocketContext from '../../context/SocketContext';

function Conversation({ convo, socket, online, typing }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);
    const me = user._id === activeConversation.latestMessage?.sender._id? true : false
    const values = {
        receiverId: getConversationId(user, convo.users),
        token: user.token,
    }
    const openConversation = async () => {
        let newConvo = await dispatch(openCreateConversation(values));
        socket.emit('join conversation', newConvo.payload._id);
    }
    console.log(convo.latestMessage.message)
    return (
        <li onClick={() => openConversation()}
            className={`list-none h-[72px] w-full p-3 hover:bg-blue-700  cursor-pointer text-white
            ${convo._id === activeConversation._id ? 'bg-blue-800' : 'bg-blue-600'}`}>
            <div className='relative w-full flex items-center justify-between'>
                {/* Left side */}
                <div className="flex items-center gap-x-3">
                    {/* Avatar */}
                    <div className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${online? 'online' : ''}`}>
                        <img src={getRelevantPic(convo, user)} alt={convo.name} className='w-full h-full object-cover' />
                    </div>
                    <div className="w-full flex flex-col">
                        {/* Name */}
                        <h1 className='font-bold flex items-center gap-x-2'>{getRelevantName(user, convo.users)}</h1>
                        <div>
                            {/* Convo message */}
                            <div className="flex items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2">
                                    {
                                        typing === convo._id? (
                                        <p className='text-dark_text_1'>Typing...</p>) : 
                                        convo.latestMessage.files.length > 0? (<p className='text-dark_text_1'>{convo.latestMessage.files[0].type}</p>) :
                                        convo.latestMessage.message.includes('https://tenor.com/') ? ('GIF') :
                                        (<p className={`${me? ('text-dark_text_4') : ('text-white')}`}>{convo.latestMessage?.message > 10 ? `${convo.latestMessage?.message.substring(0, 10)}..` :
                                        convo.latestMessage?.message}</p>)
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className='dark:text-dark_text_2 '>{convo.latestMessage?.createdAt ?
                        dateHandler(convo.latestMessage?.createdAt) : ''}</span>
                </div>
            </div>
            <hr className='mt-3 ml-4 w-64 border-b border-b-blue-800 border-t-blue-800' />
        </li>
    )
}

const ConversationWithContext = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Conversation {...props} socket={socket} />}
    </SocketContext.Consumer>
)
export default ConversationWithContext