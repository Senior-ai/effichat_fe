import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { clearFiles } from '../../../../features/chatSlice';

export const Header = ({activeIndex}) => {
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.chat);
    const clearFilesHandler = () => {
        dispatch(clearFiles());
    }
    
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between'>
                <span></span>
                <h1 className='text-text-1 text-[15px] ml-4'>{files[activeIndex]?.file?.name}</h1>
                <div className='mr-4 cursor-pointer' onClick={() => clearFilesHandler()}>
                    <AiOutlineClose color='grey' size={24}/>
                </div>
            </div>
        </div>
    )
}
