import React from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export const CallActions = () => {
  return (
    <div className='h-22 w-full absolute z-40 px-1 bottom-0'>
        <div className='relative bg-[#222222b6] px-4 pt-6 pb-12 rounded-xl'>
            <button className='absolute top-1 left-[45%]'>
                <IoIosArrowUp size={24} color='white'/>
            </button>
        </div>
    </div>
  )
}
