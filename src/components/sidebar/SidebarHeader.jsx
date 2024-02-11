import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsDot } from 'react-icons/bs';
import {GrGroup} from 'react-icons/gr';

import Menu from './Menu'

export default function SidebarHeader() {
    const { user } = useSelector((state) => state.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    return (
        <>
            <div className='h-[50px] bg-indigo-300 dark:bg-dark_bg_2 flex items-center px-4'>
                {/* Container */}
                <div className='w-full flex items-center justify-between'>
                    {/* User img */}
                    <div className='items-center flex relative'>
                        <button className='btn-2'>
                            <img src={user.picture} alt={user.name} className='w-5/6 h-5/6 rounded-full object-cover' />
                        </button>
                        <BsDot color='lightGreen' size={32} className='absolute bottom-1.5 right-2 transform translate-x-1/2 translate-y-1/2' />
                    </div>
                    {/* user icons */}
                    <ul className='flex items-center gap-x-2.5'>
                        <li>
                            <button className="btn-2">
                                <GrGroup color='white' size={20} className='dark:fill-dark_svg_1 fill-white' />
                            </button>
                        </li>
                        <li>
                            <button className="btn-2">
                                <AiOutlineHistory className='dark:fill-dark_svg_1 fill-white' />
                            </button>
                        </li>
                        <li>
                            <button className="btn-2">
                                <IoIosChatbubbles className='dark:fill-dark_svg_1 fill-white' />
                            </button>
                        </li>
                        <li className='relative' onClick={() => setShowMenu((prev) => !prev)} >
                            <button className={`btn-2 ${showMenu ? "bg-dark_hover_1" : ""}`}>
                                <HiOutlineDotsVertical className='dark:fill-dark_svg_1 fill-white' />
                            </button>
                            {
                                showMenu? <Menu onBlur={() => setShowMenu(false)}/> : null
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
