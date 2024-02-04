import React from 'react'
import { Logo } from '../../../svg'

export default function EffichatHome() {
  return (
    <div className='h-full w-full dark:bg-dark_dark_bg_4 select-none border-l dark:border-l-dark_border_1 border-b-[6px] border-b-blue-400'>
        <div className='-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
            <span>
                {/* //TODO -  Make notes here */}
            </span>
            {/* Infos */}
            <div className="mt-1 text-center spce-y-[12px]">
                <h1 className='text-[32px] dark:text-dark_text_4 font-extralight'>
                    EffiChat!
                </h1>
                <p className="text-sm dark:text-dark_text_3">
                    Send and receive messages and keep being efficient with your work.
                </p>
            </div>
        </div>
    </div>
  )
}
