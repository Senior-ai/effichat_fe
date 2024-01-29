import React from 'react'
import {logout} from '../../features/userSlice'
import { useDispatch } from 'react-redux';

export default function Menu() {
  const dispatch = useDispatch();
  return (
    <div className='absolute right-2 z-50 bg-indigo-400 text-white shadow-lg w-44'>
        <ul className='text-sm'>
            <li className='py-3 pl-5 cursor-pointer hover:bg-indigo-500'>
                <span>New group</span>
            </li>
            <li className='py-3 pl-5 cursor-pointer hover:bg-indigo-500'>
                <span>New community</span>
            </li>
            <li className='py-3 pl-5 cursor-pointer hover:bg-indigo-500'>
                <span>Starred messages</span>
            </li>
            <li className='py-3 pl-5 cursor-pointer hover:bg-indigo-500'>
                <span>Settings</span>
            </li>
            <li className='py-3 pl-5 cursor-pointer hover:bg-indigo-500' onClick={() => dispatch(logout())}>
                <span>Log Out</span>
            </li>
        </ul>
    </div>
  )
}
