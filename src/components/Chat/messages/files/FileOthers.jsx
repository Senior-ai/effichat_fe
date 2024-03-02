import React from 'react'
import { IoMdDownload } from "react-icons/io";
import {FileIcon, defaultStyles} from 'react-file-icon'

export const FileOthers = ({file, type, me}) => {
    let icontype = type.trim().toLowerCase();
  return (
    <div className={`${me? 'bg-indigo-300' : 'bg-gray-200'} p-2 rounded-md`}>
        <div className="flex justify-between gap-2">
            {/* {Download} */}
            <div className='flex items-center gap-x-8 px-2'>
                <FileIcon size={24} radius={4} extension={type} {...defaultStyles[icontype]} />
                <div className="flex flex-col gap-x-6 w-full">
                    <p>{file.original_filename}.{file.public_id.split('.')[1]}</p>
                    <span className='text-sm'>{type} . {file.bytes}B</span>
                </div>
            </div>
            <a href={file.secure_url} target='_blank' rel='noreferrer' download>
                <IoMdDownload/>
            </a>
        </div>
    </div>
  )
}
