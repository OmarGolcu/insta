import Image from 'next/image'
import {useSession ,signIn, signOut} from 'next-auth/react'
import {useRouter} from "next/router"
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    PaperAirplaneIcon,
    MenuIcon,
    HeartIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
function Header() {
    const {data:session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

   
  return (
    <div className="flex justify-between items-center max-w-6xl mt-2 mx-5 lg:mx-auto
    shadow-sm bg-white border-b sticky top-0  z-50 ">
        
        {/* Left */}
        <div onClick={()=> router.push('/')} className="relative hidden lg:inline-grid h-24 w-24">
            <Image 
                src="https://links.papareact.com/ocw"
                layout="fill"
                objectFit='contain'
            />
        </div>
        <div onClick={()=> router.push('/')} className="relative lg:hidden h-8 w-8 flex-shrink-0 cursor-pointer">
            <Image 
                src="https://links.papareact.com/jjm"
                layout="fill"
                objectFit='contain'
            />
        </div>

              {/* Middle Search input field*/}
              
         

              <div className="relative flex items-center max-w-xs ">
                    <div className="flex items-center inset-y-0 pointer-events-none z-10 ">
                        <SearchIcon className="absolute  ml-2  h-5 w-5 text-gray-400  pointer-events-none"/>
                    </div>
                    <input 
                    className="pl-8 bg-gray-50 block w-full rounded-xl outline-gray-500 sm:text-sm"
                    type="text" 
                    placeholder='Search'/>
            </div>
        


        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
            <HomeIcon onClick={()=> router.push('/')} className="navBtn"/>
            {session ? (
                
                <>
                    <MenuIcon className="h-6 md:hidden cursor-pointer"/>

                    <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn rotate-45"/>
                    <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full text-center text-gray-100 animate-pulse">4</div>
                    </div>

                    <PlusCircleIcon onClick={()=>setOpen(true)} className="plusBtn" />
                    <UserGroupIcon className="navBtn" />
                    <HeartIcon className='navBtn' />
                    <img 
                        onClick={signOut}
                        src={session.user.image}
                        className="h-10 w-10 rounded-full cursor-pointer"
                        alt="profile pic"
                    />
                </>
            ):
            (
                <button onClick={signIn}>Sign In</button>
            )}
           
            
            
        </div>

    </div>
  )
}

export default Header