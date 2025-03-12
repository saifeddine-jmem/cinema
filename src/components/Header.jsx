import React from 'react'

const Header = ({setSearch}) => {
  return (
    <div className=' w-screen '>
        <div className='bg-hero-pattern  w-screen flex justify-center  bg-center bg-cover  z-0'>
            <div className='px-5 py-12 w-screen xs:p-10 max-w-7xl mx-auto justify-center flex flex-col  z-10'>
                <img src="/hero.png" alt="" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>
            <div className='w-screen bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto'>
                <div className='flex relative items-center'>
                <img src="search.svg" className='absolute left-2 h-5 w-5' alt="search" />
                <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder='Search for movies' className='w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden' />
                </div>
            </div>
            </div>
        </div>
        
    </div>
  )
}

export default Header