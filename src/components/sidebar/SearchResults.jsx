import React from 'react'
import Contact from './Contact'

export default function SearchResults({ searchResults, setSearchResults }) {
    return (
        <div className='w-full convos scrollbar bg-blue-700'>
            <div>
                <div className="flex flex-col px-8 pt-2">
                    <h1 className='font-extralight text-md text-white'>Contacts</h1>
                    <span className='w-full mt-2 border-b border-b-slate-400'></span>
                </div>
                <ul>
                    {
                        searchResults && searchResults.map((user) => 
                            <Contact contact={user} key={user._id} setSearchResults={setSearchResults}/>)
                    }
                </ul>
            </div>
        </div>
    )
}
