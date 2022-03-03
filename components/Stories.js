import React,{useEffect, useState} from 'react'
import faker from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'




function Stories() {
    const {data:session} = useSession();
    const [suggestions,setSuggestions] = useState([])

    useEffect(() => {
        setSuggestions( [...Array(20)].map((_, i)=>({
         ...faker.helpers.contextualCard(),
         id:i,
     }))
     )
   
      
    }, [])
    
  return (
      <div 
      className='flex items-center space-x-2 p-6 bg-white mt-8 border 
      border-gray-200 rounded-md overflow-x-scroll  scrollbar scrollbar-thin scrollbar-thumb-black'>

        {session && (
            <Story 
            img={session.user.image}
            username={session.user.username} />
        )}
   {suggestions.map(profile =>(
       <Story 
       key={profile.id}
       img = {profile.avatar}
       username = {profile.username}

       />
   ))}
   </div>
  )
}

export default Stories