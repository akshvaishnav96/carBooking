import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export default function AdminHeaderWrapper() {
    const navItems = [ 
      { id: 1, text: 'brand', nav: "/admin/brand" },
      { id: 2, text: 'model', nav: "/admin/model" },
      { id: 3, text: 'add car', nav: "/admin/addcar" },
      { id: 4, text: 'cars', nav: "/admin/" },
      { id: 5, text: 'msgs', nav: "/admin/msgs" },
      ];
  return (
   <>
    <nav className="bg-gray-200 p-7  flex justify-end">
    {navItems.map(item => (
        <Link to={item.nav} key={item._id}> 
          <span 
            className='bg-gradient-to-t uppercase from-slate-500 to-slate-800 p-2 text-white px-6 py-4 m-3  rounded-xl cursor-pointer duration-300 hover:text-green-500 hover:rounded'
          >
            {item.text}
          </span>
        </Link>
      ))}
    </nav>
    <Outlet />
   </>

  )
}
