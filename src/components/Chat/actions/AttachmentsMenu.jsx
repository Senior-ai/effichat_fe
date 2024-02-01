import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import React, { useState } from 'react'
import { CameraIcon, ContactIcon, DocumentIcon, PhotoIcon, PollIcon, StickerIcon } from '../../../svg'

export const AttachmentsMenu = () => {
    
    return (
        <ul className='absolute bottom-12 openEmojiAnimation'>
            <li>
                <button type="button" className='rounded-full'>
                    <PollIcon/>
                </button>
                <button type="button" className='bg-[#0EABF4] rounded-full'>
                    <ContactIcon/>
                </button>
                <button type="button" className='bg-[#5F66CD] rounded-full'>
                    <DocumentIcon/>
                </button>
                <button type="button" className='bg-[#5a2fb1] rounded-full'>
                    <CameraIcon/>
                </button>
                <button type="button" className='rounded-full'>
                    <StickerIcon/>
                </button>
                <button type="button" className='bg-[#BF59CF] rounded-full'>
                    <PhotoIcon/>
                </button>
            </li>
        </ul>)
}
