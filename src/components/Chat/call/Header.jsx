import React from 'react'
import { IoIosArrowBack, IoIosLock } from 'react-icons/io';
import { IoPersonAddSharp } from 'react-icons/io5';

export const Header = () => {
  return (
    <header className='absolute top-0 w-full z-40'>
        <div className='p-1 flex items-center justify-between'>
            <button className='btn-2 items-center justify-center'>
                <span>
                    <IoIosArrowBack color='white' size={24}/>
                </span>
            </button>
            <p className="flex items-center">
                <IoIosLock color='white' size={24}/>
                <span className='text-xs text-white'>End-to-end Encrypted</span>
            </p>
            <button className='btn-2'>
                <IoPersonAddSharp color='white' size={24}/>
            </button>
        </div>
    </header>
  )
}
