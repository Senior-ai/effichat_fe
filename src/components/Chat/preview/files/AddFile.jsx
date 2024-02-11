import React, { useRef } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { updateFiles } from '../../../../features/chatSlice';
import { getFileType } from '../../../../utils/file';

export const AddFile = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const fileHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            if (file.size > 1024 * 1024 * 10) {
                files = files.filter((item) => item.name !== file.name);
                return;
            }
            else if (file.type !== 'image/png' && file.type !== 'image/jpeg'
                && file.type !== 'image/gif' && file.type !== 'image/webp'
                && file.type !== 'video/mp4' && file.type !== 'video/mpeg'
                && file.type !== 'video/mov' && file.type !== 'video/webm') {
                //Document handle
                    let tmpFile = documentHandler(file);
                    if (tmpFile !== undefined) {
                        //Meaning documentHandler returned a file that is out of all possible import types.
                        files = files.filter((item) => item.name !== tmpFile.name);
                     }
            } else {
                //image handle
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=(e) => {
                    dispatch(updateFiles({file: file, fileData: e.target.result, type: getFileType(file.type)}));
                }
            }
        })
    }

    const documentHandler = (file) => {
        if (file.type !== 'application/pdf' && file.type !== 'text/plain'
        && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type !== 'application/vnd.ms-powerpoint'
        && file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && file.type !== 'application/vnd.ms-excel'
        && file.type !== 'application/vnd.rar' && file.type !== 'application/zip' && file.type !== 'audio/wav' && file.type !== 'audio/mpeg') {
            return file;
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=(e) => {
                dispatch(updateFiles({file: file, fileData: e.target.result, type: getFileType(file.type)}));
            }
        }
    }

    return (
        <div className='w-14 h-14 border border-indigo-400  mt-2 rounded-md overflow-hidden cursor-pointer flex justify-center items-center' onClick={() => inputRef.current.click()}>
            <AiOutlinePlus size={30} className='fill-indigo-600' />
            <input type="file" multiple hidden ref={inputRef} onChange={fileHandler} /> 
        </div>
    )
}
