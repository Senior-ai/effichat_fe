import { useState } from 'react'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosReturnLeft, IoMdSearch  } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Search({ searchLength, setSearchResults, searchResults }) {
  console.log(searchResults);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className='h-[49px] py-1.5 bg-blue-600'>
      {/* Container */}
      <div className="px-[10px]">
        {/* Search container */}
        <div className='flex items=center gap-x-2'>
          <div className='w-full flex bg-indigo-300 rounded-lg pl-2'>
            {show || searchLength > 0 ?
              <span className='w-8 flex items-center justify-center rotateAnimation cursor-pointer' onClick={ async() => {
                setSearchResults([]);
                setInput('');
                await setShow(false);
              }}>
                <IoIosReturnLeft size={28} className='fill-white' />
              </span>
              : <span className='w-8 flex items-center justify-center'>
                <IoMdSearch size={26} className='fill-white' />
              </span>}
            <input type="text" placeholder='Search or start a new chat' className='input bg-indigo-300 placeholder-white'
              onFocus={() => setShow(true)} onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)} value={input} onChange={(e) => setInput(e.target.value)}/>
          </div>
          <button className='btn-2'>
            <IoFilterOutline size={24} color='white'/>
          </button>
        </div>
      </div>
    </div>
  )
}
