import React, { useState } from 'react'
import { IoMdNotificationsOff, IoMdClose, IoIosArrowForward   } from "react-icons/io";

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(true);
    const handleCloseNotifications = () => {
        setIsOpen(false);
    }
    return (
        <div className='h-[90px] dark:bg-dark_bg_3 bg-blue-500 flex items-center p-[13px]' style={{display: isOpen ? 'flex' : 'none'}}>
            {/* Container */}
            <div className='w-full flex items-center justify-between'>
                {/* Left side */}
                <div className='flex items-center gap-x-4'>
                    <div className='cursor-pointer'>
                        <IoMdNotificationsOff size={36} className='dark:fill-blue_1 fill-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='textPrimary'>Get notified of new messages</span>
                        <span className='textSecondary mt-0.5 flex items-center gap-0.5'>
                            Turn on desktop notifications
                            <IoIosArrowForward className='dark:fill-dark_svg_2 mt-1 fill-white' />
                        </span>
                    </div>
                </div>
                {/* Right side */}
                <div className='cursor-pointer' onClick={handleCloseNotifications}>
                    <IoMdClose size={24} className='dark:fill-dark_svg_2 fill-white' />
                </div>
            </div>

        </div>
    )
}
