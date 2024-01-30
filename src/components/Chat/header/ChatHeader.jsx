import React from 'react'
import { useSelector } from 'react-redux'
import { DotsIcon, SearchLargeIcon } from '../../../svg';
import { capitalize } from '../../../utils/string';

export default function ChatHeader() {
    const { activeConversation } = useSelector((state) => state.chat);
    const { name, picture } = activeConversation;
    return (
        <div className='h-[5%] dark:bg-dark_bg_2 bg-indigo-300 flex items-center p-2 select-none'>
            {/* Container */}
            <div className='w-full flex items-center justify-between'>
                {/* Left */}
                <div className='flex items-center gap-x-4'>
                    {/* Conversation Image */}
                    <button className='btn'>
                        <img src={picture} alt={`${name}'s profile`} className='w-full h-full rounded-full' />
                    </button>
                    <div className="flex flex-col">
                        <h1 className='text-white text-md font-bold'>
                            {capitalize(name)}
                        </h1>
                        <span className='text-xs text-white'>Online</span>
                    </div>
                </div>
                {/* Right side */}
                <ul className="flex items-center gap-x-2.5">
                    <li>
                        <button className='inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                            <SearchLargeIcon className='fill-white dark:fill-dark_svg_1'/>
                        </button>
                    </li>
                    <li>
                        <button className='inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out hover:bg-indigo-500 focus:outline-none'>
                            <DotsIcon className='fill-white dark:fill-dark_svg_1'/>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
