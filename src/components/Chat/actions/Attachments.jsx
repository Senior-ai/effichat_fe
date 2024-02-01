import React from 'react'
import { AttachmentIcon } from '../../../svg'

export default function Attachments() {
    return (
        <li className='relative'>
            <button className='btn-2'>
                <AttachmentIcon className='fill-white dark:fill-dark_svg_1'/>
            </button>
        </li>
    )
}
