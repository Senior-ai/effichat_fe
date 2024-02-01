import React, { useEffect, useState } from 'react'
import { CloseIcon, EmojiIcon } from '../../../svg'
import EmojiPicker from 'emoji-picker-react';

export default function EmojiButton({textRef, message, setMessage, showEmojis, setShowEmojis, setShowAttachments}) {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])
  const handleEmoji = (emojiData, e) => {
      const {emoji} = emojiData;
      const ref = textRef.current;
      ref.focus();
      const start = message.substring(0, ref.selectionStart);
      const end = message.substring(ref.selectionStart, ref.selectionEnd);
      const newText = start + emoji + end;
      setMessage(newText);
      setCursorPosition(start.length+emoji.length);
  }
  return (
    <li>
      <button className='icon-button' type='button' onClick={() => {
        setShowAttachments(false);
        setShowEmojis((prev) => !prev)}}>
        {showEmojis? (
          <CloseIcon className='fill-white dark:fill-dark_svg_1'/>
        ) : (<EmojiIcon className='fill-white dark:fill-dark_svg_1' />)}
      </button>
      {
        showEmojis ? (
          <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full'>
            <EmojiPicker onEmojiClick={handleEmoji} />
          </div>
        ) : ''
      }

    </li>
  )
}
