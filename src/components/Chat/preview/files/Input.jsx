import React from 'react'

export const Input = ({message, setMessage}) => {
  return (
    <div className='w-full max-w-[60%] rounded-lg bg-indigo-200'>
        <input type="text" placeholder='Type a message' value={message} onChange={e => setMessage(e.target.value)}
        className='w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text_1 text-gray-700 placeholder-gray-500' />
    </div>
  )
}
