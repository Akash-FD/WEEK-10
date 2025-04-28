import Link from 'next/link'
import React from 'react'

const AdminSidebar = () => {
  return (
    <div className='flex flex-col gap-4'>
        <Link href="/admin/allProducts">All Products</Link>
        <Link href="/admin/addProduct">Add New Product</Link>
        <Link href="/admin/allUsers">All Users</Link> 
        <Link href="/admin/allOrders">All Orders</Link> 

    </div>
  )
}
export default AdminSidebar