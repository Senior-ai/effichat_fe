import React from 'react'

export const FileImageVideo = ({url, type}) => {
  return (
    <div>
        {
            type === "IMAGE" ? (<img src={url} alt="" className='rounded-md cursor-pointer'/>) : 
            (<video src={url} controls className='rounded-md cursor-pointer'></video>)
        }
    </div>
  )
}
