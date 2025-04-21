"use client"

import { useEffect, useState } from "react"
import { getUser } from "@/lib/auth"

const Navbar = () => {
    const [user, setUser] = useState(null)
    console.log(user);
    


    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser()
            console.log(userData);
        }
        fetchUser()
     
    }, [])
    

  return (
    <div>
        <nav className="flex justify-between items-center bg-blue-500 text-white px-4 py-2">
            <div className="text-xl font-bold">MyApp</div>
            <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-200">Home</a></li>
            <li><a href="/about" className="hover:text-blue-200">About</a></li>
            <li><a href="/contact" className="hover:text-blue-200">Contact</a></li>
            </ul>
            <div className='flex gap-4'>
            <button className='bg-white text-black px-3 py-1'>Login</button>
            <button className='bg-white text-black px-3 py-1'>user</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar