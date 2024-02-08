import React, { useRef } from 'react'
import { PhotoIcon } from '../../../../svg'
import { useDispatch } from 'react-redux';
import { updateFiles } from '../../../../features/chatSlice';
import { MenuItem } from '@szhsin/react-menu';
import { FaFileUpload } from 'react-icons/fa';


export const PhotoAttachment = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const reader= new FileReader();

    const fileHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            if (file.size > 1024 * 1024 * 5) {
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
                reader.readAsDataURL(file);
                reader.onload=(e) => {
                    dispatch(updateFiles({file: file, fileData: e.target.result, type: file.split('/')[0]}));
                }
            }
        })
    }

    const documentHandler = (file) => {
        if (file.type !== 'application/pdf' && file.type !== 'text/plain'
        && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type !== 'application/vnd.ms-powerpoint'
        && file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && file.type !== 'application/vnd.ms-excel'
        && file.type !== 'application/vnd.rar' && file.type !== 'application/zip') {
            return file;
        } else {
            reader.readAsDataURL(file);
            reader.onload=(e) => {
                dispatch(updateFiles({file: file, fileData: e.target.result, type:'document'}));
            }
        }
    }

    return (
        <MenuItem className='justify-between hover:bg-indigo-300 hover:text-white' onClick={() => inputRef.current.click()}>
            <FaFileUpload /> Upload a file
            <input type="file" hidden ref={inputRef} onChange={fileHandler} /> 
        </MenuItem>
    )
}
