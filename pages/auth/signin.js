import React from 'react'
import {getProviders, signIn} from "next-auth/react"
import Header from "../../components/Header"
// Browser ...
function signin({providers}) {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center text-center min-h-screen -mt-40 py-2 px-14">
        <div>
            <img
             src="https://links.papareact.com/ocw"
             className='h-40'
             />
            <p className="font-xs italic"> This is not a REAL APP, it is build for educational purposes only</p>


        </div>

    
        <div className="mt-40">
        {Object.values(providers).map((provider) => (
        <div key={provider.name}>
            <button 
            onClick={() => signIn(provider.id,{callbackUrl:"/"})}
            className="p-3 bg-blue-400 text-white rounded-lg"
            >
            Sign in with {provider.name}
            </button>
        </div>
        ))}
        </div>
    </div>
  </>
  )
}
// Server Side Render
export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        },
    }
}

export default signin