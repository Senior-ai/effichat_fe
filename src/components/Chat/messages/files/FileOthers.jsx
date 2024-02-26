import React from 'react'
import { IoMdDownload } from "react-icons/io";
import {FileIcon, defaultStyles} from 'react-file-icon'

const supportedTypes = ['XLSX','AI', 'DOC', 'DOCX', 'INDD', 'PPT', 'PPTX', 'PSD', 'XLS'];

export const FileOthers = ({file, type}) => {
    let icontype = type.toUpperCase();
    if (!supportedTypes.includes(icontype)) {
        icontype = type.toLowerCase();
    }
  return (
    <div className='bg-indigo-300 p-2'>
        <div className="flex justify-between gap-2">
            {/* {Download} */}
            <div className='flex items-center gap-x-8 px-2'>
                <FileIcon extension={icontype} {...defaultStyles[icontype]} />
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
