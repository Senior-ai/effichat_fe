import React, { useState } from 'react'
import {Notifications, SidebarHeader, Search, Conversations, SearchResults} from './index.js'

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className='w=[40%] h-full select-none bg-blue-700'>
      {/* Sidebar header */}
      <SidebarHeader/>
      {/* Notifications */}
      <Notifications/>
      {/* Search */}
      <Search searchLength={searchResults.length} searchResults={searchResults} setSearchResults={setSearchResults}/>
      {
        searchResults.length > 0? (
          <>
            <SearchResults searchResults={searchResults}/>
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
