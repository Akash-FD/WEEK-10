import Link from 'next/link'
import React from 'react'

const placeorder = () => {
    return (
 

        <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="bg-green-500 rounded-full p-4">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
      
          <h1 className="text-3xl font-bold text-green-700">Order Placed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for shopping with us. Your order has been placed successfully.
          </p>
      
          <Link
            href="/"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
      
     
    )
}

export default placeorder