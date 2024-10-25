import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa6";
import CarBooking from './CarBooking';
import {useLocation, useNavigate} from "react-router-dom"

export default function SingleProductCard({ item }) {

  const dispatch = useDispatch()
  
const BASE_URL = import.meta.env.VITE_BASE_URL







  return (
    <>
      {item && <div className='bg-white flex gap-20 p-20 justify-center items-center'>
        <div className='flex flex-col justify-center min-w-[40%] max-w-[60%] min-h-[20rem] bg-gray-200 rounded p-10 shadow-lg shadow-gray-500/50' >
          <p className='text-2xl text-gray-500' > <span className='text-gray-800 font-bold '>Brand : </span>{item?.brand?.brand}</p>
          <p className='text-2xl text-gray-500' > <span className='text-gray-800 font-bold '>Model : </span>{item?.model?.model}</p>

          <p className='text-2xl text-gray-500' > <span className='text-gray-800 font-bold '>Car Number : </span>{item?.carnumber}</p>

          <p className='text-2xl text-gray-500' > <span className='text-gray-800 font-bold '>Available : </span>{!item?.booked ? "Yes" : "No"}</p>
          <p className='text-2xl text-gray-500' ><span className='text-gray-800 font-bold '>Description : </span>{item?.description}</p>
          {item.totalRating ? <div className='text-2xl text-gray-500 flex  items-center' ><span className='flex text-gray-800 font-bold '>Rating : <FaStar className='mx-2 text-yellow-500'/>{item?.totalRating}</span></div>:""}
         
          { item.booked ? (
            <>
            <button className="px-6 py-2 my-5 text-white bg-red-900 rounded" disabled>
              Not Available!  Already Booked
            </button>
            
              <div className="py-3">
                <p className=" text-red-700 font-bold italic mr-3 uppercase text-xs">
                  Booked From : {new Date(item.startdate).toLocaleDateString()}
                </p>
                <p className=" text-red-700 font-bold italic mr-3 uppercase text-xs">
                  to : {new Date(item.enddate).toLocaleDateString()}
                </p>
              </div>
            </>
          


          ) :<CarBooking item={item} /> }
        </div>
     
        <img src={`${item.images}`} alt="" srcSet="" className='object-fit w-[30vw] h-[20rem]' />
      </div>}
    </>
  )
}
