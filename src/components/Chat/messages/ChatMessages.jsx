import React from 'react'
import { useSelector } from 'react-redux'
import Message from './Message';

export default function ChatMessages() {
    const {messages } = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
  return (
    <div className='mb-[60px] bg-cover bg-no-repeat'>
        <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[3%]'>
            {/* Messages */}
            {
                messages && messages.map((message) => 
                <Message message={message} key={message._id} me={user._id===message.sender._id}/>)
            }
        </div>
    </div>
  )
}
