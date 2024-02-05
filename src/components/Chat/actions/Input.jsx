import { useState } from 'react'
import { useSelector } from 'react-redux';
import { TbPencilStar } from "react-icons/tb";
import SocketContext from '../../../context/SocketContext.js';
import { AiButton } from './AiButton.jsx';

function Input({ message, setMessage, textRef, socket }) {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);
  const onChangeHandler = (e) => {
    setMessage(e.target.value)
    if (!typing && e.target.value !== '') {
      setTyping(true);
      socket.emit('typing', activeConversation._id)
    }
    let lastTypingTime = new Date().getTime();
    let timer = 1500;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        setTyping(false);
        socket.emit('stop typing', activeConversation._id);
      }
    }, timer)
  }
  return (
    <div className='w-full flex-1 px-2 dark:bg-dark_hover_1 bg-white flex flex-row rounded-lg outline-none items-center'>
      <input type="text" className='dark:text-dark_text_1 w-full h-[40px] '
        placeholder='Type a message' value={message} onChange={onChangeHandler} ref={textRef} />
      <AiButton/>
    </div>
  )
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
)
export default InputWithSocket