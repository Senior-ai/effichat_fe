import { AttachmentsMenu } from './menu/AttachmentsMenu'
import { useState } from 'react';

export default function Attachments({ showAttachments, setShowAttachments, setShowEmojis }) {
    return (
        <li className='relative'>
            <AttachmentsMenu setShowEmojis={setShowEmojis} setShowAttachments={setShowAttachments} />
        </li>
    )
}
