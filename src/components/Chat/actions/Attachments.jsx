import { AttachmentIcon } from '../../../svg'
import { AttachmentsMenu } from './AttachmentsMenu'
import { useState } from 'react';

export default function Attachments({showAttachments, setShowAttachments, setShowEmojis}) {
    return (
        <li className='relative'>
            <button className='btn-2' type="button" onClick={() => {
                setShowEmojis(false);
                setShowAttachments((pre) => !pre)}}>
                <AttachmentIcon className='fill-white dark:fill-dark_svg_1'/>
            </button>
            {
                showAttachments? <AttachmentsMenu/> : ''
            }
        </li>
    )
}
