import React from 'react'
import { capitalize } from '../../../utils/string'

export const CallInfo = ({ name, callAccepted }) => {
  return (
    <div className='absolute top-12 w-full p-1 z-40'>
      <div className='flex flex-col items-center'>
        <div className="flex flex-col items-center gap-y-1">
          <p className='text-center text-lg font-bold text-white'>{name ? capitalize(name) : ''}</p>
          <span className='text-dark_text_1'>{callAccepted ? 'Timer' : 'Ringing...'}</span>
        </div>
      </div>
    </div>
  )
}
