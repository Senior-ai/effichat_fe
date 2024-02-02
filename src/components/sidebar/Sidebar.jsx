import React, { useState } from 'react'
import {Notifications, SidebarHeader, Search, Conversations, SearchResults} from './index.js'

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className='flex0030 max-w-[35%] h-full select-none bg-blue-700'>
      {/* Sidebar header */}
      <SidebarHeader/>
      {/* Notifications */}
      <Notifications/>
      {/* Search */}
      <Search searchLength={searchResults.length} searchResults={searchResults} setSearchResults={setSearchResults}/>
      {
        searchResults.length > 0? (
          <>
            <SearchResults searchResults={searchResults} setSearchResults={setSearchResults}/>
          </>
        ) : (
          <>
            <Conversations/>
          </>
        )
      }
    </div>
  )
}
