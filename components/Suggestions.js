import React, {useState, useEffect} from 'react'
import faker from '@faker-js/faker'

function Suggestions() {
    const [suggestions,setSuggestions] = useState([]);

    useEffect(()=>{
        const suggestions = [...Array(5)].map((_,i)=>(
            {
                ...faker.helpers.contextualCard(),
                id:i
            }
        ));
        setSuggestions(suggestions);
    },[])
  return (
    <div className="mt-4 ml-10">
        <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-500">Suggestions for you</h3>
            <button className='text-gray-700'>See All</button>
        </div>

        {
        suggestions.map(profile => (
            <div key={profile.id} 
            className="flex items-center justify-between mt-3">
                <img 
                src={profile.avatar}
                className="rounded-full h-10 w-10 border p-[2px]"
                />
                <div className="flex-1 mx-2"> 
                    <h2 className='font-semibold text-sm'>{profile.username}</h2>
                    <h2 className='text-xs text-gray-500'>{profile.company.name}</h2>
                </div>

                <button className="font-semibold text-sm text-blue-400">Follow</button>
                
                
                



            </div>
        ))
        }
    </div>
  )
}

export default Suggestions