import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message';
import { BeatLoader } from 'react-spinners';
import { Typing } from './Typing';
import { FileMessage } from './files/FileMessage';
export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing])
  return (
    <div className='h-full bg-cover bg-no-repeat'>
      <div className='scrollbar overflow_scrollbar overflow-auto px-[3%]'>
        {/* Messages */}
        {
          messages && messages.map((message) => (
            <>
              {
                message.files.length > 0 ? 
                message.files.map((file) => 
                <FileMessage FileMessage={file} message={message} key={message._id} me={user._id === message.sender._id}/>) : null
              }
              {
                message.message.length > 0 ? <Message message={message} key={message._id} me={user._id === message.sender._id} />
                  : null
              }
            </>
          ))}
        {typing === activeConversation._id ? <Typing /> : ''}
        <div className='mt-4' ref={endRef}></div>
      </div>
    </div>
  )
}
