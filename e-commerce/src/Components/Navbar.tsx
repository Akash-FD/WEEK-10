import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="flex justify-between items-center bg-blue-500 text-white px-4 py-2">
            <div className="text-xl font-bold">MyApp</div>
            <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-200">Home</a></li>
            <li><a href="/about" className="hover:text-blue-200">About</a></li>
            <li><a href="/contact" className="hover:text-blue-200">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar