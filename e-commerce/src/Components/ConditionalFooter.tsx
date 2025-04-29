"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

const ConditionalFooter = () => {

    const pathname = usePathname()

    if (pathname.startsWith("/login")) {
       return null        
    }
    if (pathname.startsWith('/register')) {
        return null
    }
    return <Footer/>
  
}

export default ConditionalFooter