import React from 'react'
import { useSelector } from 'react-redux'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { capitalize } from '../../../utils/string';
import { getRelevantName, getRelevantPic } from '../../../utils/chat';
import SocketContext from "../../../context/SocketContext";

function ChatHeader({ online, callUser }) {
    const { activeConversation } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { name } = activeConversation;

    return (
        <div className='h-[5%] dark:bg-dark_bg_2 bg-indigo-300 flex items-center p-2 select-none'>
            {/* Container */}
            <div className='w-full flex items-center justify-between'>
                {/* Left */}
                <div className='flex items-center gap-x-4'>
                    {/* Conversation Image */}
                    <button className='btn'>
                        <img src={getRelevantPic(activeConversation, user)} alt={`${name}'s profile`} className='w-full h-full rounded-full' />
                    </button>
                    <div className="flex flex-col">
                        <h1 className='text-white text-md font-bold'>
                            {capitalize(getRelevantName(user, activeConversation.users))}
                        </h1>
                        <span className='text-xs text-white'>{online === 'true' ? 'Online' : ''}</span>
                    </div>
                </div>
                {/* Right side */}
                <ul className="flex items-center gap-x-1">
                    {online ? (
                        <li onClick={() => callUser()}>
                            <button className='inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                                <HiOutlineVideoCamera size={24} color='white' />
                            </button>
                        </li>
                    ) : ('')
                    }
                    {online ? (
                        <li>
                            <button className='inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                                <AiOutlinePhone size={24} className='fill-white dark:fill-dark_svg_1' />
                            </button>
                        </li>) : ('')}
                    <li>
                        <button className='inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                            <IoIosSearch size={24} className='fill-white dark:fill-dark_svg_1' />
                        </button>
                    </li>
                    <li>
                        <button className='inline-flex items-center justify-center rounded-lg h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                            <BsThreeDotsVertical size={22} className='fill-white dark:fill-dark_svg_1' />
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    )
}

const ChatHeaderWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatHeader {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ChatHeaderWithSocket;