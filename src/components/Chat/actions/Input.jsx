import { useState } from 'react'
import { useSelector } from 'react-redux';
import SocketContext from '../../../context/SocketContext.js';

function Input({message, setMessage, textRef, socket}) {
  const [typing, setTyping] = useState(false);
  const {activeConversation} = useSelector((state) => state.chat);
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
    <div className='w-full'>
        <input type="text" className='dark:bg-dark_hover_1 bg-white dark:text-dark_text_1 outline-none w-full h-[40px] flex-1 rounded-lg pl-4'
        placeholder='Type a message' value={message} onChange={onChangeHandler} ref={textRef}/>
    </div>
  )
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
      {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
)
export default InputWithSocket