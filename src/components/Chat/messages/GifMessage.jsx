import React from 'react'
import moment from 'moment'

export const GifMessage = ({ message, me }) => {
    return (
        <div className={`w-full flex mt-2 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
            {/* Message */}
            <div>
                <div className={`relative h-full p-1 rounded-lg text-slate-600 ${me ? 'bg-indigo-100' : 'bg-white'}`}>
                    <a href={message.message.split(',')[0]} target='_blank' rel='noreferrer'>
                        <img src={message.message.split(',')[1]} className='gif-preview' alt='selected GIF' />
                    </a>
                    {/* Msg date */}
                    <span className='absolute right-1.5 bottom-1.5 text-xs leading-none text-slate-500'>{moment(message.createdAt).format('HH:mm')}</span>
                    {/* Options */}
                </div>
            </div>
        </div>
    )
}
