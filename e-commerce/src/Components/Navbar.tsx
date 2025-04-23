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
        <nav className="flex justify-between items-center border-b-2 mb-3 shadow px-4 py-4">
            <div className="text-3xl font-sans">Shop</div>
            <ul className="flex space-x-4">
  
           
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