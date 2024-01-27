import React from 'react'
import { ArrowIcon, CloseIcon, NotificationIcon } from '../../svg'

export default function Notifications() {
    return (
        <div className='h-[90px] dark:bg-dark_bg_3 bg-indigo-400 flex items-center p-[13px]'>
            {/* Container */}
            <div className='w-full flex items-center justify-between'>
                {/* Left side */}
                <div className='flex items-center gap-x-4'>
                    <div className='cursor-pointer'>
                        <NotificationIcon className='dark:fill-blue_1 fill-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='textPrimary'>Get notified of new messages</span>
                        <span className='textSecondary mt-0.5 flex items-center gap-0.5'>
                            Turn on desktop notifications
                            <ArrowIcon className='dark:fill-dark_svg_2 mt-1 fill-white' />
                        </span>
                    </div>
                </div>
                {/* Right side */}
                <div className='cursor-pointer'>
                    <CloseIcon className='dark:fill-dark_svg_2 fill-white' />
                </div>
            </div>

        </div>
    )
}
