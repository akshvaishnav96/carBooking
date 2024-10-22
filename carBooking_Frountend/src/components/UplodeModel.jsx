import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearInputs, inputHandler, setBrand, setModel, setSelectedBrand } from '../slices/carSlice'
import { fetchHandler } from '../utils/handlers'
import { toast } from 'react-toastify'
import ButtonWithDelete from "../components/ButtonWithDelete"
import HashLoader from 'react-spinners/HashLoader'

export default function UplodeModel() {
  const dispatch = useDispatch()
  const [error, setError] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [editId,setEditId] = useState("");


  const {brand,modelInputVal,selectedBrand,model}  = useSelector((state)=>state.cars)
  
async function handleSubmit(e){
  e.preventDefault()
  
  if (!selectedBrand) setError((prev) => {
    return { ...prev, brand: "brand field is required" }
  })


  if (!modelInputVal) setError((prev) => {
    return { ...prev, model: "model field is required" }
  })

  if(!selectedBrand && !modelInputVal) return ;

  const formData = {
    brand:selectedBrand,
    model:modelInputVal
  }

  
 try {

  setIsLoading(true)
  const data = isEdit
  ? await fetchHandler(`/api/v1/admin/cars/model/${editId}`, "patch", formData)
  : await fetchHandler("/api/v1/admin/cars/model", "post", formData);
  setIsLoading(false)

   if (data.status < 400) {
     dispatch(setModel(data.data.result))
    dispatch(clearInputs());
    toast.success(`${modelInputVal} ${isEdit ? "updated" : "Added"} successfully`);
    setError("");
  } else {
    toast.error(data.response.data.msg);
  }
 } catch (error) {
  toast.error(error.message)

 }
 setIsEdit(false)
 setEditId("");
 dispatch(clearInputs());
}

async function cancelHandler(){ 
  setEditId("");
  setIsEdit(false);
  dispatch(clearInputs());
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
         {error?.model && <p className='text-red-500'>{error.model}</p>}
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
              <option value={item._id}>{item.brand}</option>
            ))}
          </select>
         {error?.brand && <p className='text-red-500'>{error.brand}</p>}

       </div>
     </div>

     



     <div>
      {isLoading ? <HashLoader color="green"/> :  <button
         type="submit"
         className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
       >
         {isEdit ? "Update" : "Add"}
       </button>}
       {isEdit && <button onClick={cancelHandler}
         type="button"
         className="flex w-full my-4 justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
       >
         Cancel
       </button>}
     </div>

 
   </div>
 </form>
 <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4">
      {model ?
        model.map((item) => (
            <ButtonWithDelete item={item} deletePath="model" setIsEdit={setIsEdit} setEditId={setEditId} />
        )):<h3 className="text-3xl italic">No Model's Available</h3>}
          </div>
</div>
  )
}
