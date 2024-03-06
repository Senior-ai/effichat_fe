import React, { useEffect } from 'react'
import ChatHeader from './header/ChatHeader'
import { useDispatch, useSelector } from 'react-redux'
import ChatMessages from './messages/ChatMessages';
import { getConversationMessages } from '../../features/chatSlice';
import ChatActions from './actions/ChatActions';
import { checkOnlineStatus } from '../../utils/chat';
import { FilePreview } from './preview/files/FilePreview';

export default function ChatContainer({onlineUsers, typing, callUser}) {
  const dispatch = useDispatch();
  const {activeConversation, files} = useSelector((state) => state.chat);
  const {user} = useSelector((state) => state.user);
  const {token} = user;
  const values = {
    token, 
    convoId: activeConversation?._id
  }
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation])

  return (
    <div className='relative w-full h-full border-l dark:border-l-dark_border_2 border-l-indigo-500 select-none overflow-hidden'>
      {/* Container */}
      <div>
        <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} callUser={callUser} />
        {files.length > 0 ? (<FilePreview/>) : 
        (  <>
        {/* Chat messages */}
        <ChatMessages typing={typing}/>
        {/* Chat actions */}
        <ChatActions/>
        </>)}
      </div>
    </div>
  )
}
