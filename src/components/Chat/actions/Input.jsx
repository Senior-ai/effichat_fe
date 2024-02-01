import React, { useState } from 'react'

export default function Input({message, setMessage, textRef}) {
  console.log(message);
  return (
    <div className='w-full'>
        <input type="text" className='dark:bg-dark_hover_1 bg-white dark:text-dark_text_1 outline-none w-full h-[40px] flex-1 rounded-lg pl-4'
        placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} ref={textRef}/>
    </div>
  )
}
