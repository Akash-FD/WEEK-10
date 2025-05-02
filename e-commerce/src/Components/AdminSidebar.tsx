import Link from 'next/link'
import React from 'react'

const AdminSidebar = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Link href="/admin/allProducts" className="p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
        All Products
      </Link>
      <Link href="/admin/addProduct" className="p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
        Add Product
      </Link>
      <Link href="/admin/allUsers" className="p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
        All Users
      </Link>
      <Link href="/admin/allOrders" className="p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
        All Orders
      </Link>
    </div>
  )
}

export default AdminSidebar