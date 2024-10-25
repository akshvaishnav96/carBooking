import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHandler } from "../utils/handlers";
import { setBrand, setBrandInputVal, setModel, setModelInputVal, setSelectedBrand } from "../slices/carSlice";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import HashLoader from 'react-spinners/HashLoader';


export default function ButtonWithDelete({ item, deletePath,setIsEdit ,setEditId}) {
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const {brand,model} = useSelector(state=>state.cars)
  async function deleteHandler(id) {
    try {
      setIsLoading(true)
      const response = await fetchHandler(
        `/api/v1/admin/cars/${deletePath}/${id}`,
        "delete"
      );
      setIsLoading(false)


      if (deletePath === "brand") {
        dispatch(setBrand(response.data.result));
      }

      if (deletePath === "model") {
        dispatch(setModel(response.data.result));
      }
      toast.success("successfully deleted");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong while Deleting");
    }
  }

  async function editHandler(id){
    const editBrandData = deletePath === "brand" ? brand.find((item)=>item._id === id) : model.find((item)=>item._id === id);
    deletePath === "brand" ?    dispatch(setBrandInputVal(editBrandData.brand)) :  (dispatch(setSelectedBrand(editBrandData.brand._id) , dispatch(setModelInputVal(editBrandData.model))))
      
    setIsEdit(true)
    setEditId(id)
  }
  return (
    <div class="flex items-center justify-between bg-gradient-to-r from-yellow-700 to-stone-700 text-white rounded-md font-semibold">
      <div class="p-3  text-l font-bold">
        Brand :{" "}
        {deletePath === "brand"
          ? item?.brand?.toUpperCase()
          : item?.brand?.brand?.toUpperCase()}
        {item.model && (
          <div class="  text-sm font-bold">
            Model : {item.model.toUpperCase()}
          </div>
        )}
      </div>

      <div class="p-3 flex gap-4">
        <button
          onClick={()=>editHandler(item._id)}
          class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
        >
          <span>
            <FaEdit />
          </span>
          <span>edit</span>
        </button>

        {isLoading ? <HashLoader color="green"/> :<button
          onClick={() => deleteHandler(item._id)}
          class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
        >
          <span>
            <MdDeleteForever />
          </span>
          <span>Delete</span>
        </button>}
      </div>
    </div>
  );
}
