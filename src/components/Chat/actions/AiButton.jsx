import React from 'react'
import { TbPencilStar } from "react-icons/tb";

export const AiButton = () => {
    // let degree = Math.random(-180, 360);
    // let gradientDegree = document.querySelector('.gradient:hover');
    // gradientDegree.style.setProperty('--animation-degree', degree + 'deg');
  return (
    <div className='cursor-pointer rounded-full gradient p-1 justify-center items-center'>
        <TbPencilStar size={22} color='bg-dark_hover_1'/>
      </div>
  )
}
