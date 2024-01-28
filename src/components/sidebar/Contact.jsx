import React from 'react'

export default function Contact({ contact }) {
    return (
        <li className='list-none h-[72px] w-full p-3 hover:bg-blue-800 bg-blue-700 cursor-pointer text-white'>
            <div className='relative w-full flex items-center justify-between'>
                {/* Left side */}
                <div className="flex items-center gap-x-3">
                    {/* Avatar */}
                    <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img src={contact.picture} alt={contact.name} className='w-full h-full object-cover' />
                    </div>
                    <div className="w-full flex flex-col">
                        {/* Name */}
                        <h1 className='font-bold flex items-center gap-x-2'>{contact.name}</h1>
                        <div>
                            <div className="flex items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 text-dark_text_1 dark:text-dark_text_2 text-sm">
                                    {contact.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span className="mt-2 w-full border-b-2 border-b-blue-800"></span>

            </div>
        </li>
    )
}
