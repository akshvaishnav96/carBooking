import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const dispatch=useDispatch()
  const navItems = [ 
    { id: 1, text: 'admin', nav: "/admin" },
  ];

  const {loggedAdmin} = useSelector(state=>state.cars)


  return (
<>
<ToastContainer />
    <div className=' bg-gradient-to-t from-slate-500 to-slate-800 flex justify-between items-center h-[6rem] max-w-full mx-auto px-4 text-white'>
    <h1 className='text-3xl font-bold font-serif'>
      <Link to="/">Car Hub</Link>
    </h1>
  
    <div className='flex items-center space-x-4 ml-auto'> 
      <ul className='flex items-center space-x-4'> 
        {loggedAdmin?.username ? navItems.map(item => (
          <Link to={item.nav} key={item._id}> 
            <li
              className='p-2 hover:bg-white rounded-xl cursor-pointer duration-300 hover:text-black'
            >
              {item.text}
            </li>
          </Link>
        )): <Link to="/login"><button>Login</button></Link>}
      </ul>
  
     
  
      
    </div>
  </div>
  </>
  
  

  );
};

export default Header;
