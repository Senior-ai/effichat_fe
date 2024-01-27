import React, { useState } from 'react'
import {Notifications, SidebarHeader, Search} from './index.js'

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className='w=[40%] h-full select-none'>
      {/* Sidebar header */}
      <SidebarHeader/>
      {/* Notifications */}
      <Notifications/>
      {/* Search */}
      <Search searchLength={searchResults.length}/>
    </div>
  )
}
