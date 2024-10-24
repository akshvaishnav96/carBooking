import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


export default function Wrapper() {
  return (
    <div className='bg-gray-200'>
    <Header />
    <Outlet />
    <Footer />
    
    </div>
  )
}