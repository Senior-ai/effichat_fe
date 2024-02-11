import React from 'react'
import { useSelector } from 'react-redux'

export const FileViewer = ({activeIndex, setActiveIndex}) => {
    const { files } = useSelector((state) => state.chat);
    return (
        <div className='w-full max-w-[60%]'>
            <div className='flex justify-center items-center'>
                {
                    files[activeIndex]?.type === 'IMAGE' ? (
                        <div className="min-w-full min-h-full hview flex flex-col items-center justify-center mt-4">
                            <img src={files[activeIndex].fileData} alt="File preview" className='w-[90%] object-contain hview' />
                            <span className='text-gray-600 '>
                                {files[activeIndex]?.file?.size} kB - {files[activeIndex].type}
                            </span>
                        </div>
                    ) : (
                        <div className="min-w-full min-h-full hview flex flex-col items-center justify-center">
                            <img src={`../../../../images/file/${files[activeIndex].type}.png`} alt={files[activeIndex].type} className='h-[100px] w-[100px] object-contain' />
                            <h1 className='text-2xl text-gray-700'>
                                No preview available
                            </h1>
                            <span className='text-gray-600 '>
                                {files[activeIndex]?.file?.size} kB - {files[activeIndex].type}
                            </span>
                        </div>
                    )

                }

            </div>
        </div>
    )
}