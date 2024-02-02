import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message';

export default function ChatMessages() {
    const {messages } = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const endRef = useRef();
    useEffect(() => {
      endRef.current.scrollIntoView({behavior:"smooth"});
    }, [messages])
  return (
    <div className='h-full bg-cover bg-no-repeat'>
        <div className='scrollbar overflow_scrollbar overflow-auto px-[3%]'>
            {/* Messages */}
            {
                messages && messages.map((message) => 
                <Message message={message} key={message._id} me={user._id===message.sender._id}/>)
            }
            <div className='mt-4' ref={endRef}></div>
        </div>
    </div>
  )
}
