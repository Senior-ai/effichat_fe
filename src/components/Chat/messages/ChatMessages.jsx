import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message';
import { BeatLoader } from 'react-spinners';
export default function ChatMessages({typing}) {
    const {messages } = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const endRef = useRef();
    useEffect(() => {
      endRef.current.scrollIntoView({behavior:"smooth"});
    }, [messages, typing])
  return (
    <div className='h-full bg-cover bg-no-repeat'>
        <div className='scrollbar overflow_scrollbar overflow-auto px-[3%]'>
            {/* Messages */}
            {
                messages && messages.map((message) => 
                <Message message={message} key={message._id} me={user._id===message.sender._id}/>)
            }
            {typing ? <BeatLoader size={10} color='#36a9d6'/> : ''}
            <div className='mt-4' ref={endRef}></div>
        </div>
    </div>
  )
}
