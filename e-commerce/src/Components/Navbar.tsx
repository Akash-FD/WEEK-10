"use client"

import { useEffect, useState } from "react"
import { getUser } from "@/lib/auth"
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";


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
    <div className="sticky top-0 z-10 bg-white">
        <nav className="flex justify-between items-center border-b-2 mb-3 shadow px-4 py-4">
            <Link href="/" className="text-3xl font-sans">Shop</Link>
            <div className='flex gap-4 items-center'>
           <Link href="/cart"><FaCartShopping className="text-2xl"/></Link>
            <Link href="/login" className='bg-white text-black px-3 py-1'>Login</Link>
            <button className='bg-white text-black px-3 py-1'>user</button>
            </div>
            
        </nav>
    </div>
  )
}

export default Navbar