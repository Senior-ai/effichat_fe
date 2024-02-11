import React from 'react'
import { useSelector } from 'react-redux'

export const HandleAndSend = ({activeIndex, setActiveIndex}) => {
    const {files} = useSelector((state) => state.chat);
  return (
    <div className='w-[97%] items-center justify-between mt-2 broder-t dark:border-dark_border_2 border-indigo-600' >
        <span></span>
        <div className="flex gap-x-2">
            {
                files.map((file,i) => (
                    <div key={i} className={`w-14 h-14 border border-indigo-400  mt-2 rounded-md overflow-hidden cursor-pointer ${activeIndex === i? 'border-[3px] border-indigo-600 ' : ''}`} onClick={() => setActiveIndex(i)}>
                        {
                            file.type === 'IMAGE'  ? <img src={file.fileData} alt="File preview" className='w-full h-full object-contain'/> 
                            : <img src={`../../../../images/file/${file.type}.png`} alt="File preview" className='w-8 h-10 mt-1.5 ml-2.5' />
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}
