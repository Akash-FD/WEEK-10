"use client"

import { useEffect, useState } from "react"
import { getUser } from "@/lib/auth"
import Link from "next/link";


const Navbar = () => {
    interface User {
        name: string;
        [key: string]: any; // To allow additional properties if needed
    }
    
    const [user, setUser] = useState<User>({ name: "" })
    console.log(user);
    
    useEffect(() => {
      
         const fetchUser = async ()=> {
                const res: any = await getUser()
                setUser(res)
          }
          fetchUser()
     
    }, [])
    

  return (
    <div>
        <nav className="flex justify-between items-center bg-blue-500 text-white px-4 py-2">
            <div className="text-xl font-bold">MyApp</div>
            <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
           
            </ul>
            <div className='flex gap-4'>
        
            <Link href="/login" className='bg-white text-black px-3 py-1'>Login</Link>
            <button className='bg-white text-black px-3 py-1'>user</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar