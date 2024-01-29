import React from 'react';
import moment from 'moment';
import { dateHandler } from '../../utils/date';
import Avatar from 'boring-avatars';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateConversation } from '../../features/chatSlice';
import { getConversationId } from '../../utils/chat';
export default function Conversation({ convo }) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const values = {
        receiverId: getConversationId(user, convo.users),
        token: user.token,
    }
    const openConversation = () => {
        dispatch(openCreateConversation(values));
    }
    return (
        <li onClick={() => openConversation()} 
        className='list-none h-[72px] w-full p-3 hover:bg-blue-800 bg-blue-700 cursor-pointer text-white'>
            <div className='relative w-full flex items-center justify-between'>
                {/* Left side */}
                <div className="flex items-center gap-x-3">
                    {/* Avatar */}
                    <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                        {
                            convo.picture.toString().includes('Default_ProfilePicture_gjngnb') ?
                                <Avatar name={convo.name} variant={
                                    ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"][
                                    Math.floor(Math.random() * 6)
                                    ]
                                } colors={['#ff6d00', '#ff7900', '#ff8500', '#ff9e00', '#3c096c', '#7b2cbf', '#9d4edd', '#e500a4']} /> : <img src={convo.picture} alt={convo.name} className='w-full h-full object-cover' />
                        }

                    </div>
                    <div className="w-full flex flex-col">
                        {/* Name */}
                        <h1 className='font-bold flex items-center gap-x-2'>{convo.name}</h1>
                        <div>
                            {/* Convo message */}
                            <div className="flex items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2">
                                    <p>{convo.latestMessage?.message>15? `${convo.latestMessage?.message.substring(0,15)}..` : 
                                    convo.latestMessage?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className='dark:text-dark_text_2 '>{ convo.latestMessage?.createdAt ?
                    dateHandler(convo.latestMessage?.createdAt) : ''}</span>
                </div>
            </div>
            <hr className='mt-2 ml-4 w-64 border-b border-b-blue-800 border-t-blue-800' />
        </li>
    )
}
