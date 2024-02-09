import {useState, useEffect} from 'react'
import { MdGif } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import GifPicker from 'gif-picker-react';

const GIF_API_KEY = process.env.TENOR_API_KEY;

export const GifButton = ({textRef, message, setMessage, setShowEmojis, setShowAttachments}) => {
    
    const [cursorPosition, setCursorPosition] = useState();
    const [showGifs, setShowGifs] = useState(false);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])

  const handleGif = (gifData, e) => {
    const {gif} = gifData;
    console.log('Gif Picker not working yet!')
    // const ref = textRef.current;
    // ref.focus();
    // const start = message.substring(0, ref.selectionStart);
    // const end = message.substring(ref.selectionStart, ref.selectionEnd);
    // const newText = start + gif + end;
    // setMessage(newText);
    // setCursorPosition(start.length+gif.length);
  }

  return (
    <div className='cursor-pointer rounded-full justify-center items-center'>
       <button className='icon-button' type='button' onClick={() => {
        setShowAttachments(false);
        setShowEmojis(false);
        setShowGifs((prev) => !prev)}}>
        {showGifs? (
          <IoCloseSharp  size={20} color='bg-dark_hover_1'/>
        ) : (<MdGif size={35} color='bg-dark_hover_1'/>)}
      </button>
      {
        showGifs ? (
          <div className='openEmojiAnimation absolute bottom-[60px] right-2 w-full'>
            <GifPicker tenorApiKey={'AIzaSyDOAxoDjYTogyvmB7-cYIyWfqVXIDr6T60'} onGifClick={handleGif} />
          </div>
        ) : ''
      }
    </div>
  )
}
