import React from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { HiOutlineSpeakerWave, HiOutlineVideoCamera } from 'react-icons/hi2'
import { AiOutlineAudioMuted, AiOutlinePhone } from "react-icons/ai";
export const CallActions = () => {
    return (
        <div className='h-[88px] w-full absolute z-40 px-1 bottom-0'>
            <div className='relative bg-[#222222b6] px-4 pt-6 pb-12 rounded-xl'>
                <button className='absolute top-1 left-[45%]'>
                    <IoIosArrowUp size={24} color='white' />
                </button>
                <ul className='flex items-center justify-between'>
                    <li>
                        <button className='btn_secondary'>
                            <HiOutlineSpeakerWave color='white' size={26} />
                        </button>
                    </li>
                    <li>
                        <button className='btn_secondary'>
                            <HiOutlineVideoCamera color='white' size={26} />
                        </button>
                    </li>
                    <li>
                        <button className='btn_secondary'>
                            <AiOutlineAudioMuted color='white' size={26} />
                        </button>
                    </li>
                    <li>
                        <button className='btn_secondary bg-red-500 rotate-[-135deg]'>
                            <AiOutlinePhone color='white' size={26} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
