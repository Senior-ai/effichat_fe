import React from 'react'
import moment from 'moment'
export default function Message({ message, me }) {
    return (
        <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
            {/* Message */}
            <div>
                <div className={`relative h-full p-2 rounded-lg text-slate-600 ${me ? 'bg-indigo-100' : 'bg-white'}`}>
                    <p className='float-left h-fll text-sm pb-4 pr-10'>{message.message}</p>
                    {/* Msg date */}
                    <span className='absolute right-1.5 bottom-1.5 text-xs leading-none text-slate-500'>{moment(message.createdAt).format('HH:mm')}</span>
                    {/* Options */}
                </div>
            </div>
        </div>
    )
}
