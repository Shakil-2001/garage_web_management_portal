import React from 'react'

//@ts-ignore
const SearchBar = ({handleChange}) => {
  return (
    <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pt-0.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input className="ml-2 outline-none bg-gray-100 font-" type="text" name="search" id="search" placeholder="Search..." onChange={(e) => handleChange(e)}/>
    </div>
  )
}

export default SearchBar