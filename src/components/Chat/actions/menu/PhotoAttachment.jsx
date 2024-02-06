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
                && file.type !== 'image/gif' && file.type !== 'image/webp') {
                //Document handle
                
                reader.readAsDataURL(file);
                reader.onload=(e) => {
                    dispatch(updateFiles({file: file, fileData: e.target.result, type:'document'}));
                }
            } else {
                //image handle
                reader.readAsDataURL(file);
                reader.onload=(e) => {
                    dispatch(updateFiles({file: file, fileData: e.target.result, type:'image'}));
                }
            }
        })
    }
    return (
        <MenuItem className='justify-between hover:bg-indigo-300 hover:text-white' onClick={() => inputRef.current.click()}>
            <FaFileUpload /> Upload a file
            <input type="file" hidden ref={inputRef} onChange={fileHandler} /> 
        </MenuItem>
    )
}
