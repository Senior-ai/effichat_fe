import React from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { IoIosArrowDown } from 'react-icons/io';

export default function CustomMenu({message, me}) {
  return (
    <Menu menuButton={<button><IoIosArrowDown/></button>} transition>
      <MenuItem>Translate</MenuItem>
      <MenuItem>Info</MenuItem>
      <MenuItem>Note it</MenuItem>
      <MenuItem>Copy</MenuItem>
    </Menu>
  )
}
