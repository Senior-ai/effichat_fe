import React, { useEffect, useState } from 'react'
import { IoMdClose, IoMdCheckmark } from 'react-icons/io'
import ringing from '../../../audio/ringtone.mp3'
export const Ringing = ({call, setCall}) => {
  const {receivingCall, callEnded} = call;
  const [timer,setTimer] = useState(0);
  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev+1);
    }, (1000));
  };

  useEffect(() => {
    if (timer < 10) {
      handleTimer();
    } else {
      setCall({...call, receivingCall: false})
    }
    return () =>clearInterval(interval)
  }, [timer])
  return (
    <div className='bg-indigo-400 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30 '>
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* Call infos */}
        <div className="flex items-center gap-x-2">
            <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt={`caller profile picture`} className='w-28 h-28 rounded-full' />
            <div>
              <h1 className='text-white'>
                <b>Name</b>
              </h1>
              <span className='text-gray-300'>Video call...</span>
            </div>
        </div>
        {/* Call actions */}
        <ul className='flex items-center gap-x-2'>
          <li>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-red-500'>
              <IoMdClose color='white' size={28}/>
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-green-500 mt-2'>
              <IoMdCheckmark color='white' size={28}/>
            </button>
          </li>
        </ul>
      </div>
      {/* Ringtone */}
      <audio src={ringing} autoPlay loop>
      </audio>
    </div>
  )
}
