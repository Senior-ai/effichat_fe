import { useState } from 'react'
import { useSelector } from 'react-redux'
import {ChatIcon, CommunityIcon, DotsIcon, StoryIcon} from '../../svg';

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
                    <button className='btn-2'>
                        <img src={user.picture} alt={user.name} className='w-full h-full rounded-full object-cover' />
                    </button>
                    {/* user icons */}
                    <ul className='flex items-center gap-x-2.5'>
                        <li>
                            <button className="btn-2">
                                <CommunityIcon className='dark:fill-dark_svg_1 fill-white'/>
                            </button>
                        </li>
                        <li>
                            <button className="btn-2">
                                <StoryIcon className='dark:fill-dark_svg_1 fill-white'/>
                            </button>
                        </li>
                        <li>
                            <button className="btn-2">
                                <ChatIcon className='dark:fill-dark_svg_1 fill-white'/>
                            </button>
                        </li>
                        <li>
                            <button className="btn-2">
                                <DotsIcon className='dark:fill-dark_svg_1 fill-white'/>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
