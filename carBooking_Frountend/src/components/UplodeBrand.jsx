import React, { useEffect } from 'react'
import { clearInputs, inputHandler, setBrand } from '../slices/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import {fetchHandler} from "../utils/handlers"
import { toast } from 'react-toastify';



export default function UplodeBrand() {
  const dispatch = useDispatch();
  const {brandInputVal,brand}  = useSelector(state=>state.cars)
  async function handleSubmit(e){
    e.preventDefault()
    const formData = {
      brand:brandInputVal
    }
   try {
     const data = await fetchHandler("/api/v1/admin/cars/brand","post",formData)
     dispatch(setBrand(data.result))
     dispatch(clearInputs())
     toast.success(`${brandInputVal} added successfully`)
   } catch (error) {
    toast.error(error.message)
   }
  }


  return (
 <div>
     <form
    onSubmit={handleSubmit}
    className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add a new  brand 
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {/* {errorMessage && (
        <div className="text-red-500 text-center mb-4">
          {errorMessage}
        </div>
      )} */}
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Enter Brand Name
        </label>
        <div className="mt-2">
          <input
            id="brand"
            name="brandInputVal"
            type="text"
            required
            onChange={e=>dispatch(inputHandler({name:e.target.name,value:e.target.value}))}
            value={brandInputVal}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      

 

      <div>
        <button
          type="submit"
          className=" flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 my-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          Add
        </button>
      </div>

  
    </div>
  </form>
 </div>
  )
}
