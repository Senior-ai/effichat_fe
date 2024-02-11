import React, { useEffect, useState } from 'react'
import { BsEmojiDizzyFill, BsEmojiAngryFill, BsEmojiAstonishedFill, BsEmojiExpressionlessFill,
  BsEmojiGrinFill, BsEmojiHeartEyesFill, BsEmojiTearFill, BsEmojiWinkFill, BsEmojiSmileUpsideDownFill, BsEmojiSunglassesFill, BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { IoClose } from "react-icons/io5";

const emojis = [
  BsEmojiSmileFill,
  BsEmojiDizzyFill,
  BsEmojiAngryFill,
  BsEmojiAstonishedFill,
  BsEmojiExpressionlessFill,
  BsEmojiGrinFill,
  BsEmojiHeartEyesFill,
  BsEmojiTearFill,
  BsEmojiWinkFill,
  BsEmojiSmileUpsideDownFill,
  BsEmojiSunglassesFill,
];

export default function EmojiButton({textRef, message, setMessage, showEmojis, setShowEmojis, setShowAttachments}) {
  const [cursorPosition, setCursorPosition] = useState();
  const [randomEmojiIndex, setRandomEmojiIndex] = useState(0);

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

  const handleHover = () => {
    // Selecting a random emoji from the array
    let randomIndex = Math.floor(Math.random() * emojis.length);
    if (randomEmojiIndex === randomIndex) 
      randomIndex++ > emojis.length? randomIndex-- : randomIndex++;
    if (!showEmojis) { 
      setRandomEmojiIndex(randomIndex);
    }
  };

  return (
    <li>
      <button className='icon-button' type='button' onClick={() => {
        setShowAttachments(false);
        setShowEmojis((prev) => !prev)}} onMouseEnter={handleHover} >
        {showEmojis? (
          <IoClose size={24} className='fill-white dark:fill-dark_svg_1'/>
        ) : ( randomEmojiIndex !== null && React.createElement(emojis[randomEmojiIndex], { className: 'emoji dark:fill-dark_svg_1 ', size: 24}))}
      </button>
      {
        showEmojis ? (
          <div className='openEmojiAnimation absolute bottom-[60px] left-2 w-full'>
            <EmojiPicker onEmojiClick={handleEmoji} />
          </div>
        ) : ''
      }

    </li>
  )
}
