import { useState } from 'react'
import { Header } from './Header'
import { FileViewer } from './FileViewer'
import {Input} from './Input'
import { HandleAndSend } from './HandleAndSend'

export const FilePreview = () => {
    const [message, setMessage] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='relative py-2 w-full items-center flex justify-center bg-indigo-50'>
        <div className='w-full flex flex-col items-center'>
            <Header activeIndex={activeIndex}/>
            <FileViewer activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <div className="w-full flex flex-col items-center">
                <Input message={message} setMessage={setMessage} />
                <HandleAndSend activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            </div>
        </div>
    </div>
  )
}
