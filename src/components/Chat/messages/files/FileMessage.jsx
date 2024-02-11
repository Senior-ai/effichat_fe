import React from 'react'
import CustomMenu from '../CustomMenu'
import moment from 'moment'
import {FileImageVideo} from './FileImageVideo';
import { FileOthers } from './FileOthers';

export const FileMessage = ({ FileMessage, message, me }) => {
  const { file, type } = FileMessage;
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
      {/* Message */}
      <div>
        <div className={`relative h-full rounded-lg bg-white text-slate-600 ${me ? 'border-[3px] border-indigo-300' : 'bg-white'}`}>
          <p className='h-full'>
            {type === 'IMAGE' || type === 'VIDEO' ?(
            <FileImageVideo url={file.secure_url} type={type} />
            ) : (<FileOthers file={file} type={type} />)
            }</p>
          {/* <CustomMenu message={message} me={me} /> */}
          {/* Msg date */}
          <span className='absolute right-1.5 bottom-1.5 text-xs leading-none text-slate-400'>{moment(message.createdAt).format('HH:mm')}</span>
          {/* Options */}
        </div>
      </div>
    </div>
  )
}
