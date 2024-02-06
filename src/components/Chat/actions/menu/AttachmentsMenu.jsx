import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import React from 'react'
import { CameraIcon, StickerIcon, AttachmentIcon } from '../../../../svg'
import { PhotoAttachment } from './PhotoAttachment'
import { MdContactPage } from "react-icons/md";
import { FaCamera, FaPoll } from 'react-icons/fa'
import { LuSticker } from "react-icons/lu";
export const AttachmentsMenu = ( {setShowAttachments, setShowEmojis}) => {
    
    return (
        <Menu menuButton={<button className='btn-2' type="button" onClick={() => {
            setShowEmojis(false);
            setShowAttachments((pre) => !pre)}}>
            <AttachmentIcon className='fill-white dark:fill-dark_svg_1'/>
        </button>} transition>
        <PhotoAttachment/>
        <MenuItem className='attachments-menu-item'><FaPoll /> Send a poll</MenuItem>
        <MenuItem className='attachments-menu-item'><MdContactPage/> Send a contact</MenuItem>
        <MenuItem className='attachments-menu-item'><FaCamera/> Take a photo</MenuItem>
        <MenuItem className='attachments-menu-item'><LuSticker/></MenuItem>    

        </Menu>
        )
}
