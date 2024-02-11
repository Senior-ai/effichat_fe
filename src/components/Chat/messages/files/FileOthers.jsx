import React from 'react'
import { IoMdDownload } from "react-icons/io";

export const FileOthers = ({file, type}) => {
  return (
    <div className='bg-indigo-300 p-2'>
        <div className="flex justify-between gap-2">
            {/* {Download} */}
            <div className='flex items-center gap-x-8'>
                <img src={`../../../../images/file/${type}.png`} alt="File type" />
                <div className="flex flex-col gap-x-8">
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
