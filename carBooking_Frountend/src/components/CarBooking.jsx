import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearInputs, inputHandler, setCars, setMsgData } from "../slices/carSlice";
import { fetchHandler } from "../utils/handlers";
import { redirect, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import HashLoader from 'react-spinners/HashLoader';


export default function CarBooking({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const today = new Date().toISOString().split("T")[0];
  const [isLoading,setIsLoading] = useState(false)



  const { startdate, enddate, nameVal, emailVal, addressVal, mobileVal } =
    useSelector((state) => state.cars);


    

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = {
        startdate,
        enddate,
        email: emailVal,
        mobile: mobileVal,
        name: nameVal,
        address: addressVal,
      };
      setIsLoading(true)
      const response = await fetchHandler(
        `/api/v1/user/cars/${item._id}`,
        "patch",
        formData
      );
      setIsLoading(false)

      if(response.status){

        dispatch(setCars(response.data.result.newData));
        dispatch(setMsgData(response.data.result.msgData));
        dispatch(clearInputs())
        navigate("/")
        toast.success("successfully Booked")
      }
    } catch (error) {
      toast.success(error.message)

    }
  }
  
  return (
    <>
      <form className=" space-y-6 w-[40%]  my-6" onSubmit={handleSubmit}>
      <h3 className="text-3xl font-bold text-green-900 text-center mb-3 mt-8">
        fill below details to book your ride
      </h3>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Your Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="nameVal"
              type="text"
              required
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={nameVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Your email <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="emailVal"
              type="email"
              required
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={emailVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="mobile"
              name="mobileVal"
              type="number"
              required
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={mobileVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="address"
              name="addressVal"
              type="text"
              required
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={addressVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="startdate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Booking Start Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="startdate"
              name="startdate"
              type="date"
              required
              min={today}
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={startdate}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {startdate &&<div>
          <label
            htmlFor="enddate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Booking end Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="enddate"
              name="enddate"
              type="date"
              required
              min={startdate}
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={enddate}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>}
      {isLoading ? <HashLoader color="green"/>:  <button className="btn bg-blue-500 px-4 py-2 rounded text-white">
          Book Now
        </button>}
      </form>
    </>
  );
}
