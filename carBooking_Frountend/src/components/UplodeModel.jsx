import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearInputs, inputHandler, setBrand, setModel, setSelectedBrand } from '../slices/carSlice'
import { fetchHandler } from '../utils/handlers'
import { toast } from 'react-toastify'

export default function UplodeModel() {
  const dispatch = useDispatch()

  const {brand,modelInputVal,selectedBrand}  = useSelector((state)=>state.cars)
  
async function handleSubmit(e){
  e.preventDefault()
  
  const formData = {
    brand:selectedBrand,
    model:modelInputVal
  }
  
 try {
   const data = await fetchHandler("/api/v1/admin/cars/model","post",formData)

   
   dispatch(setModel(data.result))
   dispatch(clearInputs())
   toast.success("model added successfully")
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
       Add a new  Model 
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
         htmlFor="model"
         className="block text-sm font-medium leading-6 text-gray-900"
       >
         Enter Model Name
       </label>
       <div className="mt-2">
         <input
           id="model"
           name="modelInputVal"
           type="text"
           required
           onChange={e=>dispatch(inputHandler({name:e.target.name,value:e.target.value}))}
           value={modelInputVal}
           className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
       <div className='mt-2'>
     
       <select
            value={selectedBrand}
            onChange={(e) => dispatch(setSelectedBrand(e.target.value))}
            className="w-full my-2 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name='brandInputVal'
          >
            <option value="">Select Brand</option>
            {brand?.map((item) => (
              <option value={item.brand}>{item.brand}</option>
            ))}
          </select>
       </div>
     </div>

     



     <div>
       <button
         type="submit"
         className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
       >
         Add
       </button>
     </div>

 
   </div>
 </form>

</div>
  )
}
