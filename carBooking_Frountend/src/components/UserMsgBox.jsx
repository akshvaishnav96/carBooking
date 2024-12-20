import React, { useEffect } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchHandler } from '../utils/handlers';
import {setUserBookings} from "../slices/userSlice"
import { useDispatch } from 'react-redux';

export default function UserMsgBox({ item,updateBooking,deleteBooking }) {
const dispatch = useDispatch()
const navigate = useNavigate()




  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.role == "admin") {
      return navigate("/admin");
    }

   


    if(!userData){
      return navigate("/login");

    }
  },[])





  return (
    <>
   { <div className={` border border-gray-200   bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between bg-gradient-to-r from-slate-300 to-stone-400 ${item.bookingStatus === "cancelled" ? "opacity-[0.6] bg-gray-200":""}`}>
      <div className="mb-8">
        <p className="text-sm text-gray-600 flex items-center">
          Brand : {item.carDetails.brand.brand}
        </p>
        <div className="text-gray-900 font-bold text-xl mb-2">
          Model : {item.carDetails.model.model}
        </div>


        <p className="text-gray-700  text-2xl">{item.carDetails.carnumber.toUpperCase()}</p>
      </div>
      <div className="flex items-center relative">
        <img
          className="w-25 h-25 rounded-full mr-4"
          src={`${item.carDetails.images}`}
          alt="Avatar of Jonathan Reinink"
        />
        {item.bookingStatus === "cancelled" &&<div className="Cancelled bg-red-500 py-5 px-10 rotate-[-35deg] text-white text-center text-3xl w-[25rem] absolute opacity-[0.7] rounded-l left-0">Cancelled</div>}
      </div>
      <div className="text-sm my-3">
        <p className="text-blue-600 leading-none">
          Start Date : {new Date(item.startdate).toLocaleDateString()}
        </p>
        <p className="my-2 text-blue-700">
          End Date : {new Date(item.enddate).toLocaleDateString()}
        </p>
      </div>
      <div className="border-8  border-gray-400 rounded-3xl p-5 uppercase">
        <p className="font-bold">Booking User details :</p>
        <p className=" my-2text-sm text-gray-700 flex items-center">
          User Name : {item.name}
        </p>
        <Link to={`mailto:${item.email}`}> <p className=" my-2text-sm text-gray-700 flex items-center">
          email : {item.email}
        </p></Link>
        <Link to={`tel:${item.mobile}`}> <p className=" my-2text-sm text-gray-700 flex items-center">
          mobile : {item.mobile}
        </p></Link>

        <p className=" my-2text-sm text-gray-700 flex items-center">
          Address : {item.address}
        </p>


        <div className="flex items-center gap-5">

          {item.bookingStatus == "booked" ? <button className="bg-blue-500 hover:bg-blue-800 px-4 py-3 rounded text-white" onClick={() => updateBooking(item._id)}>cancel booking</button> :<button className="bg-red-500 hover:bg-red-900 px-4 py-3 rounded text-white" onClick={() => deleteBooking(item._id)}>Delete</button> }

        </div>
       

      </div>
    </div>}
  </>
  )
}
