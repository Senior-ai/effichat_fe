import React from 'react'
import { BeatLoader } from 'react-spinners'

export const Typing = () => {
    return (
        <div className={`w-full flex mt-2 space-x-3 max-w-xs`}>
            {/* Message */}
            <div>
                <div className={`relative h-full p-2 rounded-lg text-slate-600 bg-white`}>
                    <p className='float-left h-fll text-sm pb-2 px-2'>
                        <BeatLoader size={10}/>
                    </p>
                </div>
            </div>
        </div>
    )
}
