import React from 'react'
import { EmojiIcon } from '../../../svg'

export default function EmojiPicker() {
  return (
    <li>
       <button className='btn-2' type='button'>
            <EmojiIcon className='fill-white dark:fill-dark_svg_1'/> 
        </button> 
    </li>
  )
}
