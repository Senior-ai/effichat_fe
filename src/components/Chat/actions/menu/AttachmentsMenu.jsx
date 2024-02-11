import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import React from 'react'
import { ImAttachment } from "react-icons/im";
import { DocAttachment } from './DocAttachment'
import { MdContactPage } from "react-icons/md";
import { FaCamera, FaPoll } from 'react-icons/fa'
import { LuSticker } from "react-icons/lu";
export const AttachmentsMenu = ( {setShowAttachments, setShowEmojis}) => {
    
    return (
        <Menu menuButton={<button className='btn-2' type="button" onClick={() => {
            setShowEmojis(false);
            setShowAttachments((pre) => !pre)}}>
            <ImAttachment size={22} className='fill-white dark:fill-dark_svg_1'/>
        </button>} transition>
        <DocAttachment/>
        <MenuItem className='attachments-menu-item'><FaPoll /> Send a poll</MenuItem>
        <MenuItem disabled className='attachments-menu-item'><MdContactPage/> Send a contact</MenuItem>
        <MenuItem className='attachments-menu-item'><FaCamera/> Take a photo</MenuItem>  
        </Menu>
        )
}
