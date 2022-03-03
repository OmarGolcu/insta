import React from 'react'

function Story({ img, username }) {
  return (
    <div className="text-center">
        <img  className="h-14 w-14 rounded-full border-2  border-red-400 p-[1.5px] object-contain cursor-pointer hover:scale-110 transition transform duration-300 ease-out"src={img} alt={username}/>
        <p className='text-xs w-14 truncate cursor-pointer text-center'>{username}</p>
    </div>
  )
}

export default Story